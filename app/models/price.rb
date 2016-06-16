class Price
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  embeds_many :sheets
  has_and_belongs_to_many :exports

  attr_reader :file

  has_mongoid_attached_file :spreadsheet

  validates_attachment_file_name :spreadsheet, matches: [/xlsx?\Z/]


  field :name, type: String
  field :sku_prefix, type: String, default: ""
  field :deactivate_not_founded, type: Boolean, default: false

  class << self
    def export_all_offers ids
      self.find(ids).reduce(Array.new) do |export, price|
        price.sheets.each do |sheet|
          sheet.offers.each do |offer|
            export << offer
          end
        end
        export
      end
    end
  end

  def info
    @file ||= self.read_file
    @file.info
  end

  def create_sheets
    @file ||= self.read_file
    self.sheets.destroy_all
    @file.sheets.each_with_index do |name, k|
      self.sheets.create(name: name, number: k, price_config: PriceConfig.new)
    end
  end

  def spreadsheet_loaded?
    !self.spreadsheet.nil? && self.spreadsheet.exists?
  end

  protected
  def read_file
    raise 'File not set' if self.spreadsheet.nil?
    extension = self.spreadsheet.original_filename.rpartition('.').last.to_sym
    if extension == :xlsx
      Roo::Excelx.new self.spreadsheet.path
    else
      Roo::Spreadsheet.open self.spreadsheet.path, extension: extension
    end
  end
end

class Sheet
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :price
  embeds_one  :price_config
  embeds_many :offers

  field :name,      type: String
  field :number,    type: Integer
  field :first_row, type: Integer
  field :last_row,  type: Integer

  field :first_column, type: Integer
  field :last_column,  type: Integer

  validates_presence_of [:name, :number]

  before_create :parse_columns!

  def parse_columns!
    file = self.price.read_file
    sheet = file.sheet(self.number)

    self.first_column = sheet.first_column
    self.last_column  = sheet.last_column

    true
  end

  def parse_offers!
    config_present?

    file = self.price.read_file
    sheet = file.sheet(self.number)

    self.first_row = sheet.first_row
    self.last_row = sheet.last_row

    self.offers.destroy_all

    self.first_row.upto(self.last_row) do |row|

      sku = if sheet.respond_to?(:excelx_format) && !sheet.excelx_format(row, self.price_config.sku_column).nil?
          !%w|General @|.include?(sheet.excelx_format(row, self.price_config.sku_column)) &&
          zero_padded_number?(sheet.excelx_format(row, self.price_config.sku_column))
              zero_padded_number_format(sheet.excelx_value(row, self.price_config.sku_column), sheet.excelx_format(row, self.price_config.sku_column))
            else
              sheet.cell(row, self.price_config.sku_column)
            end

      sku = case
              when sku.is_a?(Integer) then sku.to_s
              when sku.is_a?(Float) then sku.to_i.to_s
              when sku.is_a?(String) then sku
              when sku.is_a?(NilClass) then ''
              else sku.to_s
            end

      next if sku == "" || sku.length == 0

      self.offers.create(
          name:  sheet.cell(row, self.price_config.name_column),
          sku:   self.price.sku_prefix + sku,

          price: sheet.cell(row, self.price_config.price_column),
          currency: self.price_config.default_currency,
          price_name: "Цена в прайсе"
      )
    end

    self.save
  end

  private
  def config_present?
    raise "not configured" if self.price_config.nil?
    true
  end

  def zero_padded_number? format
    !format[/0+/].nil? && format[/0+/].length > 0
  end

  def zero_padded_number_format number, format
    "%0#{format[/0+/].length}d"% number unless format[/0+/].nil?
  end
end

class PriceConfig
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :sheet

  field :sku_column, type: Integer
  field :name_column, type: Integer
  field :price_column, type: Integer

  field :sku_column_format, type: Regexp
  field :name_column_format, type: Regexp

  field :default_currency, type: String

  field :purchase_markup, type: Integer, default: 0

  field :retail_markup, type: Hash, default: {'0': 0}

  field :extended, type: Boolean, default: false

  # enum :default_currency, [:RUB, :EUR, :USD]
end

class Offer
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :sheet
  embeds_many :offer_prices

  field :name,  type: String
  field :sku,   type: String

  attr_accessor :price
  attr_accessor :currency
  attr_accessor :price_name

  around_create :not_create_if_broken

  def not_broken?
    (self.name.present? &&
        self.sku.present? &&
          self.offer_prices.first.present? &&
            !self.offer_prices.first.amount.nil? &&
              self.offer_prices.first.amount > 0)
  end

  private
  def not_create_if_broken
    if (self.price.present? && self.price.to_i > 0) &&
        self.sku.present? && self.name.present?
      yield
      price = self.price.to_f
      self.offer_prices.create(
          name: self.price_name,
          amount: price.ceil,
          currency: self.currency
      )
      self.offer_prices.create(
          name: "Закупочная",
          amount: (price - price * self.sheet.price_config.purchase_markup / 100).ceil,
          currency: self.currency,
          catalog_group_id: 2
      )

      retail_price = 0

      self.sheet.price_config.retail_markup.sort_by { |price, v| -price.to_i }.each do |v|
        if price <= v[0].to_f
          retail_price = price + price * v[1].to_i / 100
        elsif retail_price == 0 && v[0].to_i == 0
          retail_price = price + price * v[1].to_i / 100
        end
      end

      retail_price = retail_price.ceil

      self.offer_prices.create(
          name: "Розничная",
          amount: retail_price,
          currency: self.currency,
          catalog_group_id: 1
      )
    else
      self.destroy
      false
    end
  end
end


class OfferPrice
  include Mongoid::Document
  include Mongoid::Timestamps::Updated

  embedded_in :offer

  field :name,     type: String
  field :amount,   type: Float
  field :currency, type: String
  field :catalog_group_id, type: Integer, default: 0

  after_find :init_currency

  def get_currency
    @currency
  end

  private
  def init_currency
    # @currency = case self.currency
    #   when "RUB" then Currency::Ruble.instance
    #   when "EUR" then Currency::Euro.instance
    #   when "USD" then Currency::Dollar.instance
    #   else raise "Currency not set or wrong, use RUB, EUR or USD"
    # end
  end
end

class Export
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  has_mongoid_attached_file :json
  validates_attachment :json,
                       content_type: { content_type: ["application/json", "text/plain"] }
  do_not_validate_attachment_file_type :json

  has_and_belongs_to_many :prices
  embeds_many :updated_offers

  field :exported_at, type: DateTime

  field :offers_count, type: Integer
  field :updated, type: Array, default: []
  field :not_found, type: Array, default: []
end

class UpdatedOffer
  include Mongoid::Document

  embedded_in :export

  field :sku, type: String
  field :name, type: String
  field :link, type: String
  field :img, type: String

  field :old_price, type: Float
  field :new_price, type: Float

  field :currency, type: String
end
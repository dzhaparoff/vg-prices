json.extract! @price, :id, :created_at, :updated_at, :name, :spreadsheet, :sku_prefix

json.spreadsheet_file do
  json.loaded !@price.spreadsheet_file_size.nil?
  json.name @price.spreadsheet_file_name
  json.extension @price.spreadsheet_content_type
  json.size @price.spreadsheet_file_size
  json.updated_at @price.spreadsheet_updated_at
end unless @price.spreadsheet_file_size.nil?

json.spreadsheet_file false if @price.spreadsheet_file_size.nil?

json.spreadsheet_loaded @price.spreadsheet_loaded?

json.sheets do
  json.array! @price.sheets do |sheet|
    json.(sheet, :id, :name, :number, :first_row, :last_row, :updated_at, :price_config, :first_column, :last_column)

    json.configurated sheet.price_config.present? &&
                          sheet.price_config.name_column.present? &&
                          sheet.price_config.sku_column.present? &&
                          sheet.price_config.price_column.present? &&
                          sheet.price_config.default_currency.present?

    json.offers_parsed sheet.offers.count > 0
    json.offers_count sheet.offers.count
  end
end

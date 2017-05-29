json.array! @prices do |price|
  json.extract! price, :id, :created_at, :updated_at, :name, :spreadsheet, :sku_prefix, :deactivate_not_founded

  json.spreadsheet_file do
    json.loaded !price.spreadsheet_file_size.nil?
    json.name price.spreadsheet_file_name
    json.extension price.spreadsheet_content_type
    json.size price.spreadsheet_file_size
    json.updated_at price.spreadsheet_updated_at
  end unless price.spreadsheet_file_size.nil?

  json.spreadsheet_file false if price.spreadsheet.exists?

  json.spreadsheet_loaded price.spreadsheet_loaded?

  json.sheets_count price.sheets.size if price.spreadsheet.exists?
  json.offers_count price.sheets.reduce(0) {|sum, sheet| sum + sheet.offers.size } if price.spreadsheet.exists?
end
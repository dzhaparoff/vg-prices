json.array! @sheets do |sheet|
  json.(sheet, :id, :name, :number, :first_row, :last_row, :updated_at, :price_config)

  json.configurated sheet.price_config.present? &&
                        sheet.price_config.name_column.present? &&
                        sheet.price_config.sku_column.present? &&
                        sheet.price_config.price_column.present? &&
                        sheet.price_config.default_currency.present?

  json.offers_parsed sheet.offers.count > 0
  json.offers_count sheet.offers.count
end
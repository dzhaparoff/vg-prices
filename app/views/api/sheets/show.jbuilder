json.(@sheet, :id, :name, :number, :first_row, :last_row, :first_column, :last_column, :updated_at, :price_config)

json.configurated @sheet.price_config.present? &&
                      @sheet.price_config.name_column.present? &&
                      @sheet.price_config.sku_column.present? &&
                      @sheet.price_config.price_column.present? &&
                      @sheet.price_config.default_currency.present?

json.offers_parsed @sheet.offers.count > 0
json.offers_count @sheet.offers.count

json.offers do
  json.array! @sheet.offers do |offer|
    json.id offer.id
    json.name offer.name
    json.sku offer.sku
    json.offer_prices offer.offer_prices
    json.not_broken? offer.not_broken?
  end
end
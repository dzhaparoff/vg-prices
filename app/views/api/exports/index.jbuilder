json.array! @exports do |export|
  json.id         export.id
  json.file       export.json
  json.file_size  export.json_file_size
  json.exported_at export.exported_at
  json.exported export.exported_at.present?

  json.api_responce do
    json.offers_count export.offers_count
    json.updated export.updated
    json.updated_count export.updated.count unless export.updated.nil?
    json.not_found export.not_found
    json.not_found_count export.not_found.count unless export.not_found.nil?
  end

  json.prices do
    json.array! export.prices do |price|
      json.id price.id
      json.name price.name
    end
  end
end
class Api::ExportsController < Api::ApiController
  def index
    @exports = Export.all
  end

  def show
    @export = Export.find(params[:id])
  end

  def destroy
    @export = Export.find(params[:id])
    @export.destroy
    render :show
  end

  def export
    @exports = Export.find(params[:ids])

    client = Faraday.new('https://vse-generatori.ru')
    config = Hash.new
    config[:deactivate_not_founded] = Array.new

    req_body = @exports.reduce([]) do |req, export|

      export.prices.each do |price|
        config[:deactivate_not_founded] << { prefix: price.sku_prefix, replace: price.deactivate_not_founded }
      end

      file_content = IO.read( Rails.root.join("public", export.json.url[1..-12]) )
      req + JSON.parse(file_content)

    end

    res = client.post do |req|
      req.url '/app/api/v1.0/sync_offers/'
      req.headers['Content-Type'] = 'application/json'
      req.body = Yajl::Encoder.encode({
                                          offers: req_body,
                                          config: config
                                      })
    end

    res_body = JSON.parse(res.body)

    @exports.each do |e|
      e.update(
          exported_at:  DateTime.now,
          offers_count: res_body['count'],
          updated:      res_body['updated'],
          not_found:    res_body['not_found']
      )

      e.updated_offers.destroy_all

      res_body['updated_offers'].each do |updated_offer|
        e.updated_offers.create updated_offer
      end

      res_body['deactivated_offers'].each do |deactivated_offer|
        e.deactivated_offers.create deactivated_offer
      end
    end

    render :index
  end

  private
  def price_params
    params.require(:export).permit(:id)
  end
end
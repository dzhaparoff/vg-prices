class Api::PricesController < Api::ApiController
  def index
    @prices = Price.all
    sleep 2
  end

  def new
    @price = Price.new
  end

  def create
    @price = Price.create(price_params)
    render :show
  end

  def show
    @price = Price.find(params[:id])
  end

  def edit

  end

  def spreadsheet_update
    @price = Price.find(params[:id])
    @price.spreadsheet = params[:file]
    @price.save
    render :show
  end

  def update
    @price = Price.find(params[:id])
    @price.update(price_params)
    render :show
  end

  def destroy
    @price = Price.find(params[:id])
    @price.destroy
    render :show
  end

  def create_sheets
    @price = Price.find(params[:id])
    @price.create_sheets
    render :show
  end

  def export_offers
    ids = params[:ids]
    @export = Price.export_all_offers ids
    str = JSON.parse(render)
    t = Tempfile.new(["export", ".json"])
    begin
      t.write str.to_json
      @result = Export.create(json: t, prices: Price.find(ids))
    ensure
      t.close
      t.unlink
    end
  end

  private
  def price_params
    params.permit(:name, :sku_prefix)
  end
end
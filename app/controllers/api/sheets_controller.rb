class Api::SheetsController < Api::ApiController
  def index
    @sheets = Price.find(params[:price_id]).sheets
  end

  def show
    @sheet = Price.find(params[:price_id]).sheets.find(params[:id])
  end

  def edit

  end


  def update
    @sheet = Price.find(params[:price_id]).sheets.find(params[:id])
    @sheet.update(sheet_params)
    @sheet.price_config.retail_markup = params[:price_config][:retail_markup].to_hash
    @sheet.price_config.save
    render :show
  end

  def parse_offers
    @sheet = Price.find(params[:price_id]).sheets.find(params[:id])
    @sheet.parse_offers!
    render :show
  end

  private
  def sheet_params
    params.permit(
        :id,
        price_config: [:name_column, :price_column, :sku_column, :default_currency, :retail_markup, :purchase_markup, :deactivate_not_founded]
    )
  end
end
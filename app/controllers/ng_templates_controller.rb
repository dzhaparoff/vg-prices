class NgTemplatesController < ApplicationController
  def template
    template = "ng_templates/"
    template << "/#{params[:template_group]}" if params[:template_group].present?
    template << "/#{params[:template]}"
    render template: template
  end
end
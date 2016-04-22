Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root 'static#index'

  namespace :api do
    resources :exports, only: [:index, :show, :destroy] do
      post ":action", on: :collection
    end

    resources :prices do
      post "spreadsheet", on: :member, action: "spreadsheet_update"
      patch ":action", on: :member
      post ":action", on: :collection

      resources :sheets do
        patch ":action", on: :member
      end
    end
  end

  scope :ng do
    scope :templates do
      scope "(:template_group)" do
        get ':template.tmpl', to: 'ng_templates#template'
      end
    end
  end

  get "/:page", to: "static#index"
  get "/:page_group/:page", to: "static#index"
  get "/:page_group_parent/:page_group/:page", to: "static#index"
  get "/:page_group_parent_parent/:page_group_parent/:page_group/:page", to: "static#index"
end

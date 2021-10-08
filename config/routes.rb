Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :packages , only:[:create, :update, :destroy ]
      resources :sessions, only: [:create]
      #devise_for :users
      post '/packages/userpackages', to: 'packages#userpackages'
    end
  end
 
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    #root to: "packages#index"
end

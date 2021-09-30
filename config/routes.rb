Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'
      devise_for :users
      resources :packages
      resources :sessions, only: [:create,:destroy]
      post 'sessions', to: 'sessions#create'
    end
  end
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    #root to: "packages#index"
    #get '/*path' => 'packages#index'
end

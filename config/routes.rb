Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      #post 'user_token' => 'user_token#create'
      resources :packages
      resources :sessions, only: [:create,:destroy]
      #post '/sessions', to: 'sessions#create'
      #post '/packages', to: "packages#create"
      #put '/packages', to: 'packages#update'
      #post '/sessions/packages', to: 'sessions#savepackage'
      post '/packages/userpackages', to: 'packages#userpackages'
    end
  end
 
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    #root to: "packages#index"
    #devise_for :users

end

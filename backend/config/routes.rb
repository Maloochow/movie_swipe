Rails.application.routes.draw do

  resources :users, only: [:create, :show, :index]

  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

end

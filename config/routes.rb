Rails.application.routes.draw do
  root to: "artists#index"

  get '/artists', to: 'artists#index'

  get '/artists/new', to: 'artists#new', as: "new_artist"

  post '/artists', to: 'artists#create'

  get '/artists/:id', to: 'artists#show', as: "artist"

  get 'login', to: 'sessions#new', as: "login"

  post '/sessions', to: 'sessions#create'

  get '/sessions', to: 'sessions#destroy', as: "logout"

end

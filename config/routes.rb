Rails.application.routes.draw do
  root to: "artists#home"

  get '/artists', to: 'artists#index'

  get '/artists/new', to: 'artists#new', as: "new_artist"

  post '/artists', to: 'artists#create'

  get '/artists/:id', to: 'artists#show', as: "artist"

  get 'login', to: 'sessions#new', as: "login"

  post '/sessions', to: 'sessions#create'

  get '/sessions', to: 'sessions#destroy', as: "logout"

  get '/artists/:id/edit', to: 'artists#edit', as: "edit_profile"

  patch 'artists/:id', to: 'artists#update'

  get '/admin', to: 'artists#admin', as: "admin"

  get '/home', to: 'artists#home', as: "homepage"

  get '/drawing', to: 'drawing#new', as: "new_drawing"

  get '/galleries', to: 'galleries#index', as: "galleries"

  get '/galleries/:id', to: 'galleries#show'

  post '/drawing/convert', to: 'drawing#convert'

  get '/artists/:id/drawings', to: 'artists#drawings', as: "artwork"

  get '/drawing/:id', to: 'drawing#show', as: "art"

  delete '/drawing/:id', to: 'drawing#destroy', as: "destroy_art"

  get '/galleries/:id/renditions', to: 'galleries#renditions', as: "renditions"

end

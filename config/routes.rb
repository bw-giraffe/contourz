Rails.application.routes.draw do
  root to: "artists#index"

  get '/artists', to: 'artists#index'
end

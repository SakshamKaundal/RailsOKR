Rails.application.routes.draw do
  root "objectives#index"
  resources :objectives
end

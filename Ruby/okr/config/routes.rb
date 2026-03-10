Rails.application.routes.draw do
  root "objectives#index"
  resources :objectives do
    resources :key_results, only: [ :create, :destroy ]
  end
end

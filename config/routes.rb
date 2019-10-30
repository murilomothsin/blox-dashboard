Rails.application.routes.draw do
  get 'pages/home'
  namespace :api, constraints: { format: :json } do
    get 'dashboards', to: 'dashboards#index'
  end
  get '*path' => 'pages#home', constraints: { format: :html }
  root to: 'pages#home'
end

if Rails.env === 'production' 
    Rails.application.config.session_store :active_record_store, key: '_bob', domain: 'name-of-you-app-json-api'
  else
    Rails.application.config.session_store :active_record_store, key: '_bob'
  end
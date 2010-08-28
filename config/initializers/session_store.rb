# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_tic_tac_toe_session',
  :secret      => '721871b7d3eb6929b81353ad8fd7f218f474e08c145c63ae5c45e7277e613aa51f8fb785ac3b2022d04a0b969278cfa708b1977c81d8b9bab9971d746e807590'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

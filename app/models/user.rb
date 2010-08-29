class User < ActiveRecord::Base
  
  has_many :games
  
  acts_as_authentic do |c|
    c.validate_email_field = false
  end
end

class User < ActiveRecord::Base

  has_many :games
  has_many :ai_implementations, :order => 'created_at desc'

  before_create :generate_first_code

  acts_as_authentic do |c|
    c.validate_email_field = false
  end
  
  protected
  def generate_first_code
    self.ai_implementations.build(:name => 'First')
  end
end

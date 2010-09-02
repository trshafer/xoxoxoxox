class User < ActiveRecord::Base

  has_many :games
  has_many :ai_implementations, :order => 'created_at desc'

  before_create :generate_first_code

  acts_as_authentic do |c|
    c.merge_validates_format_of_email_field_options(:allow_blank => true) 
    c.merge_validates_length_of_email_field_options(:allow_blank => true) 
    c.merge_validates_uniqueness_of_email_field_options(:allow_blank => true)
  end
  
  protected
  def generate_first_code
    self.ai_implementations.build(:name => 'First')
  end
end

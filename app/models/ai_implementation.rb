class AiImplementation < ActiveRecord::Base
  belongs_to :user

  before_create :set_default_code
  
  attr_accessor :service_url

  validates_presence_of :name

  protected
  def set_default_code
self.code = <<-eos
// #{self.name}
// Create your own AI
// Click on the HELP link at the bottom to open the help dialog.
function move(){
  Logger.info('Making move from #{self.name}');
  //This will return the first available space.
  return Board.getEmptySpaceIds()[0];
}
eos
  end

end

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
  var aiSpaces = Board.getSpaceIdsForAI();
  var competitorSpaces = Board.getSpaceIdsForCompetitor();
  var blankSpaces = Board.getEmptySpaceIds();
  Logger.info(aiSpaces);
  Logger.info(competitorSpaces);
  Logger.info(blankSpaces);
  Logger.info(Board.getSpaceOccupier(0));
  //This will return the first available space.
  return Board.getEmptySpaceIds()[0];
}
eos
  end

end

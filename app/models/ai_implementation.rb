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
// the only function you must implement is a move function
// the move function must return an integer between 0-8
// the space must be empty
// to get user spaces call: Board.spaceIdsFor('user');
// to get computer spaces call: Board.spaceIdsFor('computer');
// to get empty spaces call: Board.emptySpaceIds();
// To see if you have a winning set use: Rules.playerWins(playerIdsArray);
// if you get frustrated, you can alwasys go back to Board.emptySpaceIds().random();
function move(){
  Logger.info('Making move from #{self.name}');
  return Board.emptySpaceIds().random();
}
eos
  end

end

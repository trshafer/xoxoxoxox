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
// The only function you must implement is a move function
// The move function must return an integer between 0-8 
// The space must be empty
// Public interface:
//   To get competitor (user/opponent ai) spaces call: Board.getSpaceIdsForCompetitor();
//   To get computer spaces call: Board.getSpaceIdsForAI();
//   To get empty spaces call: Board.getEmptySpaceIds();
//   To see if you have a winning set use: Rules.playerWins(playerIdsArray);
// Client Logger:
//  Logger.info('some info'), Logger.warn('a warning'), Logger.error('the error');
//  The Logger will pretty print objects for you: {a: 'b', c: [1, 2, {d: 'f'}]} 
// if you get frustrated, you can always go back to Board.getEmptySpaceIds().sort(function(){return 0.5-Math.random()})[0];

function move(){
  Logger.info('Making move from #{self.name}');
  return Board.getEmptySpaceIds().sort(function(){return 0.5-Math.random()})[0];
}
eos
  end

end

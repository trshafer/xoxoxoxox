class AiImplementation < ActiveRecord::Base
  belongs_to :user

  before_create :set_default_code
  
  attr_accessor :service_url

  validates_presence_of :name

  protected
  # // Create your own AI
  # // the only function you must implement is a move function
  # // to get user spaces call: Board.spaceIdsFor('user');
  # // to get computer spaces call: Board.spaceIdsFor('computer');
  # // to get empty spaces call: Board.emptySpaceIds();
  # // To see if you have a winning set use: Rules.playerWins(playerIdsArray);
  # // if you get frustrated, you can alwasys go back to Board.emptySpaceIds().random();
  def set_default_code
    self.code = "//#{self.name}\nfunction move(){\n  return Board.emptySpaceIds().random();\n}"
  end

end

class User < ActiveRecord::Base

  has_many :games

  acts_as_authentic do |c|
    c.validate_email_field = false
  end

  def ai
    <<-eos
      // Create your own AI
      // the only function you must implement is a move function
      // to get user spaces call: Board.spaceIdsFor('user');
      // to get computer spaces call: Board.spaceIdsFor('computer');
      // to get empty spaces call: Board.emptySpaceIds();
      // To see if you have a winning set use: Rules.playerWins(playerIdsArray);
      // if you get frustrated, you can alwasys go back to Board.emptySpaceIds().random();
      function move(){
        return Board.emptySpaceIds().random();
      }
    eos
  end
end

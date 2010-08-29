class GamesController < ApplicationController

  def create
    @game = current_user.games.create
    respond_to do |wants|
      wants.json { render :json => {:game_id => @game.id }}
    end
  end

  def mark_move
    @game = current_user.games.find(params[:id], :include => :moves)
    @game.moves.create(params[:move].merge(:move_number => @game.moves.size + 1))
    respond_to do |wants|
      wants.json { render :json => {:success => true }}
    end
  end
end

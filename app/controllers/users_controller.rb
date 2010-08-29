class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    respond_to do |wants|
      if @user.save
        find_last_ai
        wants.js #create.js.rjs
      else
        wants.js { render :action => :create_errors }
      end
    end
  end


end

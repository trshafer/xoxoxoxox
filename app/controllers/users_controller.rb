class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    respond_to do |wants|
      if @user.save
        wants.js #create.js.rjs
      else
        wants.js { render :action => :create_errors }
      end
    end
  end


end

class UserSessionsController < ApplicationController
  before_filter :require_user, :only => :destroy

  def create
    @user_session = UserSession.new(params[:user_session])
    respond_to do |wants|
      if @user_session.save
        find_last_ai
        wants.js #create.js.rjs
      else
        wants.js {render :action => :create_errors}
      end
    end
  end

  def destroy
    session[:recent_ai] = nil
    current_user_session.destroy
    setup_blank_user
    respond_to do |wants|
      wants.js #destroy.js.rjs
    end
  end
end

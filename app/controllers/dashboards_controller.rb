class DashboardsController < ApplicationController

  def show
    if current_user.blank?
      setup_blank_user
    else
      @recent_ai = session[:recent_ai].present? ? current_user.ai_implementations.find(session[:recent_ai]) : current_user.ai_implementations.last
    end
    respond_to do |wants|
      wants.html {  }
    end
  end
end

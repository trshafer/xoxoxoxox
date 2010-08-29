class DashboardsController < ApplicationController

  def show
    if current_user.blank?
      setup_blank_user
    else
      find_last_ai
    end
    respond_to do |wants|
      wants.html {  }
    end
  end
end

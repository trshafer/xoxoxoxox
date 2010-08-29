class DashboardsController < ApplicationController

  def show
    setup_blank_user if current_user.blank?
    respond_to do |wants|
      wants.html {  }
    end
  end
end

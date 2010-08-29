class DashboardsController < ApplicationController

  def show
    setup_blank_user
    respond_to do |wants|
      wants.html {  }
    end
  end
end

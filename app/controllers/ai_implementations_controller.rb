class AiImplementationsController < ApplicationController

  def create
    @ai = current_user.ai_implementations.create(params[:ai_implementation])
    @ai.service_url = user_ai_implementation_path(current_user, @ai)
    respond_to do |wants|
      wants.js { render :partial => 'tab_item', :object => @ai}
    end
  end

  def update
    @ai = current_user.ai_implementations.find(params[:id])
    @ai.update_attributes(params[:ai_implementation])
    respond_to do |wants|
      wants.json { render :json => @ai.to_json }
    end
  end

  def show
    @ai = current_user.ai_implementations.find(params[:id])
    session[:recent_ai] = @ai.id
    respond_to do |wants|
      wants.html { render :json => @ai.to_json }
    end
  end

end

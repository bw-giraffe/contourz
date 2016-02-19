class DrawingController < ApplicationController

  def new
    @drawing = Drawing.new
    render :new
  end
  
end

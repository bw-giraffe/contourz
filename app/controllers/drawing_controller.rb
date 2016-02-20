class DrawingController < ApplicationController

  def new
    @last_drawing = Drawing.last
    @drawing = Drawing.new
    render :new
  end
  
end

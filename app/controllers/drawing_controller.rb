class DrawingController < ApplicationController
  require 'base64'
  require "browser"
  browser = Browser.new("Some User Agent", accept_language: "en-us")
  before_action only: [:show, :destroy] do
    p "ENTERED BEFORE ACTION FOR DRAW"
    drawing = Drawing.find_by_id(params[:id])
    p "DRAWING ID #{drawing}"
    if(!authorized?(drawing.artist_id))
      flash[:notice] = "You do not have access."
      redirect_to artist_path(current_artist.id)
    end
  end

  def new
    p "PARAMS IN NEW #{params}"
    p "YOU HIT THE NEW DRAWING CONTROLLER";
    @photo = Photo.order("RANDOM()").first 
    @drawing = Drawing.new
  
    respond_to do |format|
      format.html
      format.json do
        p "!--RENDERING IN JSON--!"
        render json: {url: @photo.url, photo: @photo.id}
      end
    end
  end
  
  def convert
    p "params photo_id !!!!!!!! #{params[:photo_id]}"
    if(params[:photoOnly]) 
      redirect_to new_drawing_path
    else 
      data_uri = params[:data_uri]
      photo_id = params[:photo_id]
      image_data = Base64.decode64( data_uri.slice("data:image/png;base64,".length..-1) )
      store_drawing(image_data, photo_id)
      redirect_to new_drawing_path
    end
  end

  def show
    @drawing = Drawing.find_by_id(params[:id])
    render :show
  end

  def destroy
    @drawing = Drawing.find_by_id(params[:id])
    @drawing.destroy
    flash[:notice] = "Successfully removed art"
    redirect_to artwork_path(current_artist.id)
  end

   def mobile
    p "YOU ENTERED THE FUCKING MOBILE CONTROLLER FUCK YOU RAILS"
    @photo = Photo.order("RANDOM()").first 
    @drawing = Drawing.new
    render :mobile
  end

end

class DrawingController < ApplicationController
  require 'base64'
  before_action only: [:show, :destroy] do
    drawing = Drawing.find_by_id(params[:id])
    if(!authorized?(drawing.artist_id))
      flash[:notice] = "You do not have access."
      redirect_to artist_path(current_artist.id)
    end
  end

  def new
    @photo = Photo.order("RANDOM()").first 
    @drawing = Drawing.new
    message = ""
    if(seen?(@photo.id))
      message = "Practice makes perfect"
    end
    respond_to do |format|
      format.html
      format.json do
        p "!--RENDERING IN JSON--!"
        render json: {url: @photo.url, photo: @photo.id, seen: message}
      end
    end
  end
  
  def convert
    p "params photo_id !!!!!!!! #{params[:photo_id]}"
    p "params photo_id !CLASS!!! #{params[:photo_id].class}"
    data_uri = params[:data_uri]
    photo_id = params[:photo_id]
    image_data = Base64.decode64( data_uri.slice("data:image/png;base64,".length..-1) )
    store_drawing(image_data, photo_id)
    redirect_to new_drawing_path
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

end

class DrawingController < ApplicationController
  require 'base64'

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
        render json: {url: @photo.url, gallery: @photo.gallery_id, seen: message}
      end
    end
  end
  
  def convert
    data_uri = params[:data_uri]
    photo_id = params[:photo_id]
    image_data = Base64.decode64( data_uri.slice("data:image/png;base64,".length..-1) )
    store_drawing(image_data, photo_id)
    redirect_to new_drawing_path
  end

  def show
    @drawing = Drawing.find_by_id(params[:artid])
    render :show
  end

end

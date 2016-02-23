class DrawingController < ApplicationController
  require 'base64'

  def new
    @last_photo = Photo.last
    p "LAST PHOTO #{@last_photo.url}"
    @drawing = Drawing.new
    render :new
  end
  
  def convert
    data_uri = params[:data_uri]
    photo_id = params[:photo_id]
    image_data = Base64.decode64( data_uri.slice("data:image/png;base64,".length..-1) )
    File.open("#{Rails.root}/seedimgs/temp.png", 'wb') do |f|
      f.write image_data
    end
    Drawing.create({
      :image => File.new("#{Rails.root}/seedimgs/temp.png"),
      :artist_id => 2,
      :photo_id => 4
    })
    File.delete("#{Rails.root}/seedimgs/temp.png")
    render text: "Blaaaa"
  end

end

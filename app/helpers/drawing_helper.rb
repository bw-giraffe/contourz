module DrawingHelper

  def store_drawing(decoded_image, photo_id)
    #create an image file
    File.open("#{Rails.root}/seedimgs/temp0.png", 'wb') do |f|
      f.write decoded_image
    end
    # store it in the db
    Drawing.create({
      :image => File.new("#{Rails.root}/seedimgs/temp0.png"),
      :artist_id => current_artist.id,
      :photo_id => photo_id
    })
    #delete original 
    File.delete("#{Rails.root}/seedimgs/temp0.png")
  end

  def seen?(photoid)
    result = Drawing.where(photo_id: photoid, artist_id: current_artist.id)
    if(result.to_a.empty?)
      return false
    else
      return true
    end
  end
end

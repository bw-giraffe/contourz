class GalleriesController < ApplicationController

  def index
    @galleries = Gallery.all
  end

  def show
    @gallery = Gallery.find_by_id(params[:id])
    @photos = @gallery.photos
  end

  def renditions
    @original = Photo.find_by_id(params[:id])
    @renditions = Drawing.where(photo_id: params[:id]).last(50)
    render :renditions #lol
  end
end

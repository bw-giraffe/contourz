class GalleriesController < ApplicationController
  def index
    @galleries = Gallery.all
  end

  def show
    p "ID IS #{params[:id]}"
    @gallery = Gallery.find_by_id(params[:id])
    @photos = @gallery.photos
  end
end

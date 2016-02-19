class ArtistsController < ApplicationController

  def index
    @artists = Artist.all
    render :index
  end

  def new
    @artist = Artist.new
    render :new
  end

  def create
    @artist = Artist.create(artist_params)
    login(@artist)
    redirect_to root_path
  end

  def show
    @artist = Artist.find_by_id(params[:id])
    render :show
  end

  private

  def artist_params
    params.require(:artist).permit(:username, :location, :email, :password)
  end


end

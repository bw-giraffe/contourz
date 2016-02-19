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

  def edit
    if !authorized?(params[:id])
      flash[:notice] = "You do not have access to edit this profile."
      redirect_to artist_path
    else
      @artist = Artist.find_by_id(params[:id])
      render :edit
    end
  end

  def update 
    artist_params = params.require(:artist).permit(:username, :location, :email)
    @artist = Artist.find_by_id(params[:id])
    @artist.update_attributes(artist_params)
  
    redirect_to artist_path
  end

  private

  def artist_params
    params.require(:artist).permit(:username, :location, :email, :password)
  end


end

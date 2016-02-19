class SessionsController < ApplicationController

  def new
    @artist = Artist.new
    render :new
  end

  def create
    artist_params = params.require(:artist).permit(:email, :password)
    @artist = Artist.confirm(artist_params)
    if @artist
      login(@artist)
      flash[:notice] = "Successfully logged in."
      redirect_to @artist
    else
      flash[:error] = "Incorrect email or password."
      redirect_to login_path
    end
  end

  def destroy
    logout
    flash[:notice] = "Successfully logged out." 
    redirect_to root_path
  end
  
end

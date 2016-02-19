module SessionsHelper

  def login(artist)
    session[:artist_id] = artist.id
    @current_artist = artist
  end

  def current_artist
    @current_artist ||= Artist.find_by_id(session[:artist_id])
  end

  def logged_in?
    if current_artist == nil
      redirect_to new_artist_path
    end
  end

  def logout
    @current_artist = session[:artist_id] = nil
  end

  def authorized?(artist)
    current_artist.id == artist.to_i
  end

  def password_match?
    
  end

end

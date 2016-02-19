class Artist < ActiveRecord::Base
  has_many :drawings
  has_secure_password

  def self.confirm(params)
    @artist = Artist.find_by({email: params[:email]})
    @artist.try(:authenticate, params[:password])
  end  
end

class Drawing < ActiveRecord::Base
  belongs_to :artist
  belongs_to :photo
end

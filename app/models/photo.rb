class Photo < ActiveRecord::Base
  has_many :drawings
  belongs_to :gallery
end

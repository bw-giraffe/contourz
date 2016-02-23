class Drawing < ActiveRecord::Base
  belongs_to :artist
  belongs_to :photo
  has_attached_file :image, styles: {medium: "300x300>", thumb: "100x100#" }, default_url: "/seedimgs/moat.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end

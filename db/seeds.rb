# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Gallery.create({
#   theme: "birds"
#   })

neu_photo = Photo.create({
    url: "http://cdn.discoverhawaiitours.com/wp-content/uploads/blog/2012/11/Kualoa-Ranch-Horseback-Riding-square-sm-4540.jpg",
    gallery_id: 1
  })

Drawing.create({
  :image => File.new("#{Rails.root}/seedimgs/lol.jpg"),
  :artist_id => 2,
  :photo_id => neu_photo.id
})


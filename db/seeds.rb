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

# neu_photo = Photo.create({
#     url: "http://cdn.discoverhawaiitours.com/wp-content/uploads/blog/2012/11/Kualoa-Ranch-Horseback-Riding-square-sm-4540.jpg",
#     gallery_id: 1
#   })

# Drawing.create({
#   :image => File.new("#{Rails.root}/seedimgs/lol.jpg"),
#   :artist_id => 2,
#   :photo_id => neu_photo.id
# })


g1 = Gallery.create({
  theme: "birds"
})

g2 = Gallery.create({
  theme: "historical figures"
})

g3 = Gallery.create({
  theme: "food"
})


hsfigs_photo_urls = ["http://mentalfloss.com/sites/default/legacy/blogs/wp-content/uploads/2012/08/abe-lincoln-last-portrait.jpg", "http://cp91279.biography.com/1000509261001/1000509261001_2051017817001_Bio-Biography-Sally-Ride-SF.jpg", "http://img2-3.timeinc.net/people/i/2013/news/130211/queen-beatrix-300.jpg"]
birds_photo_urls = ["http://s.hswstatic.com/gif/pelican-1.jpg", "http://media.web.britannica.com/eb-media/94/90494-004-8B5C94CC.jpg", "http://www.factzoo.com/sites/all/img/birds/toucan/channel-billed-toucan.jpg"]
food_photo_urls = ["https://www.dunkindonuts.com/content/dunkindonuts/en/menu/food/bakery/donuts/donuts/_jcr_content/block/image.img.png/1415193587324.png", "http://farm3.static.flickr.com/2122/2273955494_8a255942f0.jpg", "http://25.media.tumblr.com/tumblr_m4kacaQOcH1qbih6so1_500.jpg"]



hsfigs_photo_urls.each do |f|
  Photo.create({
    :url => f,
    :gallery_id => g2.id
    })
end

birds_photo_urls.each do |f|
  Photo.create({
    :url => f,
    :gallery_id => g1.id
    })
end

food_photo_urls.each do |f|
  Photo.create({
    :url => f,
    :gallery_id => g3.id
    })
end



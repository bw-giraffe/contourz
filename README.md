

##I started this project wanting to make something fun and engaging. I had taken art classes when I was in college and one of my favorite exercises was blind contour drawings. I had one week to construct the majority of the project.

###Technologies Used
Ruby on Rails, Postgresql, Javascript, jQuery, AJAX, Amazon Web Services S3

###Known Issues

1) After the draw cycle ends, the drawing is still present but the background remains transparent. 

2) CSS -- there are quite a few CSS issues throughout the project with regards to spacing. Honestly, this was one of the most challenging parts of the project. It's so hard to center things and get them on the page exactly as you envision them. But it is a satisfying challenge nonetheless, especially when you get it to work. 

3) Form fields when updating profile information arent in a legible font.

4) There are on page style sheets. :-o I faced some challenges trying to keep the stylesheets separated in Rails. 


###Triumphs

1) Separating the Javascript files used for each view. There's actually an awesome tutorial on it here 
http://brandonhilkert.com/blog/page-specific-javascript-in-rails/

```
$( '.artists.show' ).ready(function () {
	var artistImgs = $('#artistslideshow');

```


2) Integrating Amazon Web Services S3 for storing my images
I nearly panicked when I found out that Heroku's dynos wipe out most of your saved image files (drawings in this case). Luckily there's AWS s3 which stores your images with the help of the Paperclip gem. 

```
config.paperclip_defaults ={
     :storage => :s3,
     :s3_credentials => {
     :bucket =>

```

####3) Getting the html canvas to work on mobile! 
This took me a long time, but the Chrome Developer Console has a great mobile development tester. It allowed me to test out new "touchstart" and "touchend" events for drawing, whereas the desktop version relies on 'click' and 'onmousemove' actions to detect when someone is drawing. 
```
$('#draw').on('touchstart', function (event) {
					drawSession.begin();
});
```


###Future Work
Aside from fixing the known issues I'd love to

1) Add a seeding tool that utilizes the Flickr API to pull new images and photos. This will allow me to curate new subjects for users to draw.

2) Changing the draw page layout to allow users the maximum amount of space to draw an image. 

$( document ).ready(function () {
	console.log("THIS ARTIST PAGE WORKS");
	$("#slides").owlCarousel({
	  navigation : true, // Show next and prev button
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
	});
});
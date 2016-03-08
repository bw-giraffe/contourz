$( '.artists.show' ).ready(function () {
	var artistImgs = $('#artistslideshow');

	initCarousel(artistImgs);
	
	function initCarousel(elem) {
		elem.owlCarousel({
			navigation : true, // Show next and prev button
		  	itemsDesktop : [1199,3],
		  	itemsDesktopSmall : [979,3],
			touchDrag: true,
			stagePadding: 50,
			loop: true,
		});
	}

	$('img.owlImgs').on('click', function(event){
		url = $(this).attr('src');
 		console.log("you clicked this", url); 
 		$('#myModal').modal(); 
 		img = replacement(url);
 		$('#modalPic').replaceWith(img);
  	});

	function replacement(url) {
		new_img = "<img src='" + url + "'" + "id='" +  "modalPic'" + "/>";
		return new_img;
	}
});
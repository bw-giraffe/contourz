// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require hermitage
//= require jquery_ujs
//= require_tree .
//= require owl.carousel
//= require moment

$( document ).ready(function () {
	console.log("application!");
	var artistImgs = $('#artistslideshow');
	var gallImgs = $('#slides');

	function initCarousel(elem) {
		elem.owlCarousel({
		navigation : true, // Show next and prev button
	  	itemsDesktop : [1199,3],
	  	itemsDesktopSmall : [979,3]
		});
	}

	if(artistImgs.length) {
		initCarousel(artistImgs);
	} else if(gallImgs.length) {
		initCarousel(gallImgs);
	}


	var curtain = new Image();
	curtain.src = "http://i65.tinypic.com/4v3ke9.png";

	var CURRENT_INTERVAL;
	$('#canvasTop').hide();
	buttonsHide();

    $('#go').on('click', function (e) {
    	$('#canvasTop').show();
    	$('#go').hide();
    	buttonsHide();
    	clearInterval( CURRENT_INTERVAL );
    	CURRENT_INTERVAL = initializeClock('time', getTime());
    });

    function getTime() {
   		var twoMins = moment().add(20, 'seconds');
   		return twoMins._d
   	}

   	function getTimeRemaining(endtime){
   		var t = Date.parse(endtime) - Date.parse(new Date());
   		var seconds = Math.floor( (t/1000) % 60);
   		var minutes = Math.floor( (t/1000/60) % 60 );
   		var hours = Math.floor( (t/(1000*60*60)) % 24 );
   		var days = Math.floor( t/(1000*60*60*24) );
   		return {
    		'total': t,
    		'days': days,
    		'hours': hours,
    		'minutes': minutes,
    		'seconds': seconds
  		};
   	}
   	
   	function initializeClock(id, endtime){
	  var clock = document.getElementById(id);
	  function updateClock(){
  		var t = getTimeRemaining(endtime);
  		clock.innerHTML = 
                    'minutes: ' + t.minutes + '  ' + '  seconds: ' + t.seconds;
  		if(t.total<=0){
    	clearInterval(timeinterval);
    	$('#canvasTop').hide();
    	buttonsShow();
  		}
	}
	updateClock(); // run function once at first to avoid delay
	var timeinterval = setInterval(updateClock,1000);
	return timeinterval;
	}

	// DRAW
	var curtain = new Image(),
	    canvas = document.getElementById('canvasBottom'),
	    canvasTop = document.getElementById('canvasTop'),
	    ctx = canvas.getContext('2d'),
	    ctxMouse = canvasTop.getContext('2d');

	curtain.onload = setup;

	function setup() {
	    ctxMouse.drawImage(this, 0, 0);
	}
	// // huh?
	// curtain.src = "http://i63.tinypic.com/zjxo5g.png";

	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = '#FFFF00';

	$('#blackCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#blueCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#redCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#yelCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#options .fat').on("click", function(e) {
		ctx.lineWidth = 10;
	});

	$('#options .med').on("click", function(e) {
		ctx.lineWidth = 5;
	});

	$('#options .thin').on("click", function(e) {
		ctx.lineWidth = 2;
	});


	var px, py, isDown = false;

	canvasTop.onmousedown = function (e) {
	    var pos = getXY(e);
	    px = pos.x;
	    py = pos.y;
	    isDown = true;
	}

	canvasTop.onmouseup = function () {
	    isDown = false;
	}

	canvasTop.onmousemove = function (e) {
	    if (isDown) {
	        var pos = getXY(e);
	        ctx.beginPath();
	        ctx.moveTo(px, py);
	        ctx.lineTo(pos.x, pos.y);
	        ctx.stroke();
	        px = pos.x;
	        py = pos.y;
	    }
	}

function getXY(e) {
    var rect = canvasTop.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

	$('#save').on('click', function (e) {
		console.log("YOU ENTERED SAVE");
		var dataURL = canvas.toDataURL();
		var photoId = $('#photoRef').attr('data-photo')
		document.getElementById('canvasBottom').src = dataURL;
		console.log(dataURL);
		$.ajax({
  			type: "POST",
  			url: "/drawing/convert",
  			dataType: "json",
			data: {
				data_uri: dataURL,
				photo_id: photoId
			},
			success: function (res) {
				console.log("RES", res);
				$('#photoRef').replaceWith(replacement(res.url, res.photo));
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				buttonsHide();
				$('#go').show();
			}
		});
	});

	$('#next').on('click', function (e) {
		$.ajax({
			type: "POST",
			url: "/drawing/convert",
			dataType: "json",
			data: {
				photoOnly: true
			},
			success: function (res) {
				console.log("YOUR RESPONSE FROM THE CONTROLLER", res);
				$('#photoRef').replaceWith(replacement(res.url, res.photo));
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				buttonsHide();
				$('#go').show();
			}

		});
	})

	function replacement(url, photo) {
		new_img = "<img src='" + url + "'" + " data-photo='" + photo + "'" + " id= '" + "photoRef" + "'" + "/>";
		return new_img;
	}

	function buttonsHide(){
		$('#save').hide();
	}
	function buttonsShow() {
		$('#save').show();
	}
});

// $( document ).ready(function () {
// 	console.log("Draw page sanity check working!");
	
// 	var curtain = new Image();
// 	curtain.src = "http://i63.tinypic.com/zjxo5g.png";

// 	var CURRENT_INTEVAL;

//     $('#go').on('click', function (e) {
//     	buttonsHide();
//     	clearInterval( CURRENT_INTEVAL );
//     	CURRENT_INTEVAL = initializeClock('time', getTime());
//     });

//     function getTime() {
//    		var twoMins = moment().add(4, 'seconds');
//    		return twoMins._d
//    	}

//    	function getTimeRemaining(endtime){
//    		var t = Date.parse(endtime) - Date.parse(new Date());
//    		var seconds = Math.floor( (t/1000) % 60);
//    		var minutes = Math.floor( (t/1000/60) % 60 );
//    		var hours = Math.floor( (t/(1000*60*60)) % 24 );
//    		var days = Math.floor( t/(1000*60*60*24) );
//    		return {
//     		'total': t,
//     		'days': days,
//     		'hours': hours,
//     		'minutes': minutes,
//     		'seconds': seconds
//   		};
//    	}

   	
//    	function initializeClock(id, endtime){
// 	  var clock = document.getElementById(id);
// 	  function updateClock(){
//   		var t = getTimeRemaining(endtime);
//   		clock.innerHTML = 
//                     'minutes: ' + t.minutes + '  ' + '  seconds: ' + t.seconds;
//   		if(t.total<=0){
//     	clearInterval(timeinterval);
//     	buttonsShow();
//   		}
// 	}
// 	updateClock(); // run function once at first to avoid delay
// 	var timeinterval = setInterval(updateClock,1000);
// 	return timeinterval;
// 	}




// 	//canvas
// 	var canvas = document.getElementById('drawCanvas');
// 	var ctx = canvas.getContext('2d');

// 	var painting = document.getElementById('paint');
// 	var paint_style = getComputedStyle(painting);
// 	canvas.width = 425;
// 	canvas.height = 375;
// 	// curtain.onload = function(){
// 	// 	curtain.drawImage(curtain, 0, 0);
//  //    };

// 	// canvas.height = parseInt(paint_style.getPropertyValue('height'));

// 	var mouse = {x: 0, y: 0};

// 	canvas.addEventListener('mousemove', function(e) {
// 		mouse.x = e.pageX - this.offsetLeft;
// 		mouse.y = e.pageY - this.offsetTop;
// 	}, false);

// 	$('#blueCircle').on("click", function(e){
// 		ctx.strokeStyle = $(this).attr('data-fill')
// 	});

// 	$('#redCircle').on("click", function(e){
// 		ctx.strokeStyle = $(this).attr('data-fill')
// 	});

// 	$('#thick .fat').on("click", function(e) {
// 		ctx.lineWidth = 10;
// 	});

// 	$('#thick .med').on("click", function(e) {
// 		ctx.lineWidth = 5;
// 	});

// 	$('#thick .thin').on("click", function(e) {
// 		ctx.lineWidth = 2;
// 	});


// 	ctx.lineWidth = 3;
// 	ctx.lineJoin = 'round';
// 	ctx.lineCap = 'round';
// 	ctx.strokeStyle = '#00CC99';
// 	ctx.lineWidth = 2;
	
// 	canvas.addEventListener('mousedown', function(e) {
// 		$('#drawCanvas').css('cursor', 'pointer')
// 		ctx.beginPath();
// 		ctx.moveTo(mouse.x, mouse.y);
// 		canvas.addEventListener('mousemove', onPaint, false);
// 	}, false);

// 	canvas.addEventListener('mouseup', function() {
// 		// ctx.drawImage(curtain, 0, 0);
// 		canvas.removeEventListener('mousemove', onPaint, false);
// 	}, false);

	
// 	var onPaint = function() {
// 		ctx.lineTo(mouse.x, mouse.y);
// 		ctx.stroke();
// 	};

// 	$('#save').on('click', function (e) {
// 		console.log("YOU ENTERED SAVE");
// 		var dataURL = canvas.toDataURL();
// 		var photoId = $('#photoRef').attr('data-photo')
// 		document.getElementById('drawCanvas').src = dataURL;
// 		console.log(dataURL);
// 		$.ajax({
//   			type: "POST",
//   			url: "/drawing/convert",
//   			dataType: "json",
// 			data: {
// 				data_uri: dataURL,
// 				photo_id: photoId
// 			},
// 			success: function (res) {
// 				console.log("RES", res);
// 				$('#photoRef').replaceWith(replacement(res.url, res.photo));
// 				ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			}
// 		});
// 	});

// 	$('#next').on('click', function (e) {
// 		console.log("YOU ENTERED NEXT");
// 		$.ajax({
// 			type: "POST",
// 			url: "/drawing/convert",
// 			dataType: "json",
// 			data: {
// 				photoOnly: true
// 			},
// 			success: function (res) {
// 				console.log("YOUR RESPONSE FROM THE CONTROLLER", res);
// 				$('#photoRef').replaceWith(replacement(res.url, res.photo));
// 				ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			}

// 		});
// 	})

// 	function replacement(url, photo) {
// 		new_img = "<img src='" + url + "'" + " data-photo='" + photo + "'" + " id= '" + "photoRef" + "'" + "/>";
// 		return new_img;
// 	}

// 	function buttonsHide(){
// 		$('#save').hide();
// 	}
// 	function buttonsShow() {
// 		$('#save').show();
// 	}

// });
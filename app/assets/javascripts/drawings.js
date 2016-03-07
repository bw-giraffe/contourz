$(document).ready(function() {

	console.log("Draw page sanity check working!");
	
	var ui = {
		colorOptions: function() {
			$('.circle').each(function (e) {
			circFill = $(this).data('fill');
			$(this).css("background", circFill);
			});

			$('.thick').each(function (e) {
			width = $(this).data('height');
			$(this).css("width", width);
			});

		}
	};

	var mCurtain = new Image();
	mCurtain.src = "https://pbs.twimg.com/profile_images/3634387352/ceabbf28c421b26a5802f4ed14e4bd39.jpeg";

	mCanvasBottom = document.getElementById('mCanvasBottom');
	mCanvasTop = document.getElementById('mCanvasTop');
	ctx = mCanvasBottom.getContext('2d');
	ctxHidden = mCanvasTop.getContext('2d');

	ctx.strokeStyle = "000000";	
	ctx.lineWidth = 2;

		var start = function(e) {
			e = e.originalEvent;
			ctx.beginPath();
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY-300;
			ctx.moveTo(x, y);
		};
		var move = function(e) {
			e.preventDefault();
			e = e.originalEvent;
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY-300;
			ctx.lineTo(x,y);
			ctx.stroke();
		};
	
		$('#mobileRefPhoto').on('touchstart', function (e) {
			ctxHidden.drawImage(mCurtain, 0, 0);
		});
		
		var CURRENT_INTERVAL = 0;
		//for testing only
		var randomInterval = 5;
		// var randomInterval = Math.floor(Math.random() * ((90-10)+1) + 10);
		
		var countdown = {

			getCurrent: function() {
				
				var twoMins = moment().add(randomInterval, 'seconds');
   				return twoMins._d
			},

			getRemaining: function(endtime) {
				console.log("rando", randomInterval);
				var t = Date.parse(endtime) - Date.parse(new Date());
				var seconds = Math.floor( (t/1000) % 60);
				var minutes = Math.floor( (t/1000/60) % 60);
				return {
					'total': t,
					'minutes': minutes,
					'seconds': seconds
				}
			},

			start: function(id, endtime) {
				function updateCountdown(){
					var t = countdown.getRemaining(endtime);
					console.log("totes", t);
					$('#countdown').html("minutes:  " + t.minutes + "  seconds: " + t.seconds);
					if(t.total<=0) {
						// clearInterval(timeinterval);
						countdown.clear(timeinterval);
					}
				}
				updateCountdown();
				var timeinterval = setInterval(updateCountdown, 1000);
				return timeinterval;
			},

			clear: function(currentint) {
				console.log("You executed the clear function");
				clearInterval(currentint);
				drawSession.end();
			}
		};

		

    	var drawSession = {

    		await: function() {
    			$('#colors').hide();
    			$('#strokes').hide();
    			$('#saveButtons').hide();
				$('#drawButtons').show();
				$('#draw').on('touchstart', function (event) {
					drawSession.begin();
				});
    		}, 

    		begin: function() {
				//hide draw buttons
				$('#drawButtons').hide();
				//show colors and strokes
				$('#colors').show();
				$('#strokes').show();
				//change ui
				ui.colorOptions();
				//draw curtain
				ctxHidden.drawImage(mCurtain, 0, 0);
				//timer starts 
				var now = countdown.getCurrent();
				CURRENT_INTERVAL = countdown.start('countdown', now);

    		},

    		end: function() {
    			//hide colors
    			$('#colors').hide();
    			//hide strokes
    			$('#strokes').hide();
    			//show save

    			//hide curtain
    			ctxHidden.clearRect(0, 0, 320, 280);
    			$('#saveButtons').fadeIn(200);

    		},

    		skip: function() {
    			$('#skip').on('touchstart', function (e) {
    				$.ajax({
						type: "POST",
						url: "/drawing/convert",
						dataType: "json",
						data: {
							photoOnly: true
						},
						success: function (res) {
							console.log("YOUR RESPONSE FROM THE CONTROLLER", res);
							$('#mobileRefPhoto').replaceWith(replacement(res.url, res.photo));
						}
					});
    			});
    		},

    		save: function() {
    			console.log("YOU ENTERED SAAVE");
    			$('#saveDrawing').on('touchstart', function (e) {
    				var dataURL = mCanvasBottom.toDataURL();
					var photoId = $('#mobileRefPhoto').attr('data-photo');
					document.getElementById('mCanvasBottom').src = dataURL;
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
							$('#mobileRefPhoto').replaceWith(replacement(res.url, res.photo));
							ctx.clearRect(0, 0, 320, 280);
							$('#saveButtons').hide();
							$('#drawButtons').show();
						}
					});
    			});
    		}
    	} 

    	drawSession.await();
    	drawSession.skip();
    	drawSession.save();
		//might be mCanvasBottom
		$(this).on("touchstart", start);
		$(this).on("touchmove", move);

		$('#colors').bind('touchstart', function (e) {
    		color = $(e.target).data('fill');
    		$(e.target).fadeOut(200);
    		$(e.target).fadeIn(200);
    		ctx.strokeStyle = color;
		});

		$('.thick').bind('touchstart', function (e) {
			stroke = $(e.target).data('stroke');
			$(e.target).fadeOut(200);
    		$(e.target).fadeIn(200);
			ctx.lineWidth = stroke;
		});

		function replacement(url, photo) {
			new_img = "<img src='" + url + "'" + " data-photo='" + photo + "'" + " id= '" + "mobileRefPhoto" + "'" + "class='"+"pure-img'" + "/>";
			return new_img;
		}
		
});
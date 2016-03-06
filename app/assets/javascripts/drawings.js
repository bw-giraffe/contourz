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
		var randomInterval = Math.floor(Math.random() * ((90-10)+1) + 10);
		
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
						clearInterval(timeinterval);
					}
				}
				updateCountdown();
				var timeinterval = setInterval(updateCountdown, 1000);
				return timeinterval;
			},
			clear: function() {
				clearInterval( CURRENT_INTERVAL );
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

    		},

    		skip: function() {

    		},

    		save: function() {

    		}
    	} 

    	drawSession.await();
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
		
});
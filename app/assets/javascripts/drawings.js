$( document ).ready(function () {
	console.log("Draw page sanity check working!");
	$('.circle').each(function (e) {
		circFill = $(this).data('fill');
		$(this).css("background", circFill);
	});

	$('.thick').each(function (e) {
		height = $(this).data('height');
		$(this).css("height", height);
	});

	var mCurtain = new Image();
	mCurtain.src = "https://pbs.twimg.com/profile_images/3634387352/ceabbf28c421b26a5802f4ed14e4bd39.jpeg";

	mCanvasBottom = document.getElementById('mCanvasBottom');
	mCanvasTop = document.getElementById('mCanvasTop');
	ctx = mCanvasBottom.getContext('2d');
	ctxHidden = mCanvasTop.getContext('2d');

	ctx.strokeStyle = "#ff00ff";	
	ctx.lineWidth = 5;

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

		$('#saveButtons').hide();
		$('#drawButtons').hide();
		
		var CURRENT_INTERVAL = 0;
		
		var countdown = {

			getCurrent: function() {
				var randomInterval = Math.random(10, 80);
				var twoMins = moment().add(randomInterval, 'seconds');
   				return twoMins._d
			},

			getRemaining: function(endtime) {
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
					var countdown = document.getElementById(id);
					var t = getTimeRemaining(endtime);
					countdown.append('minutes: ' + t.minutes + ' ' + '  seconds: ' + t.seconds);
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

		}

		var newCountdown = new Countdown();
    	CURRENT_INTERVAL = newCountdown.start('countdown', newCountdown.getCurrent());

		//might be mCanvasBottom
		$(this).on("touchstart", start);
		$(this).on("touchmove", move);

		$('#colors').bind('touchstart', function (e) {
    		color = $(e.target).data('fill');
    		ctx.strokeStyle = color;
		});

		$('.thick').bind('touchstart', function (e) {
			stroke = $(e.target).data('stroke');
			ctx.lineWidth = stroke;
		});
		
});
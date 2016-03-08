$('.drawing.new').ready(function() {

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
	mCurtain.src = "http://i64.tinypic.com/j5f507.png";

	canvasBottom = document.getElementById('canvasBottom');
	canvasTop = document.getElementById('canvasTop');
	ctx = canvasBottom.getContext('2d');
	ctxHidden = canvasTop.getContext('2d');

	ctx.strokeStyle = "000000";
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';	
	ctx.lineWidth = 2;

	canvasToggle = false; 

	var px, py, isDown = false;

	canvasTop.onmousedown = function (e) {
		if(canvasToggle) {
		    var pos = getXY(e);
		    px = pos.x;
		    py = pos.y;
		    isDown = true;
		}
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

	var CURRENT_INTERVAL = 0;
		//for testing only
		var randomInterval = 4;
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
				$('#countdown').hide();
				drawSession.end();
				canvasToggle = false;
			}
		};

		var drawSession = {

    		await: function() {
    			$('#countdown').hide();
    			$('#colors').hide();
    			$('#strokes').hide();
    			$('#saveButtons').hide();
				$('#drawButtons').show();
				$('#draw').on('click', function (event) {
					drawSession.begin();
				});
    		}, 

    		begin: function() {
    			canvasToggle = true;
    			$('#countdown').show();
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
    			$('#countdown').hide();
    			$('#colors').hide();
    			$('#strokes').hide();
    			ctxHidden.clearRect(0, 0, 500, 340);
    			$('#saveButtons').fadeIn(200);

    		},

    		endDraw: function() {
    			$('#saveButtons').hide();
				$('#drawButtons').show();
				ctx.clearRect(0, 0, 500, 340);
    		},

    		skip: function() {
    			$('#skip').on('click', function (e) {
    				$.ajax({
						type: "POST",
						url: "/drawing/convert",
						dataType: "json",
						data: {
							photoOnly: true
						},
						success: function (res) {
							console.log("YOUR RESPONSE FROM THE CONTROLLER", res);
							$('#refPhoto').replaceWith(replacement(res.url, res.photo));
						}
					});
    			});
    		}, 

    		skipSave: function() {
    			$('#skipSave').on('click', function (e) {
    				$.ajax({
						type: "POST",
						url: "/drawing/convert",
						dataType: "json",
						data: {
							photoOnly: true
						},
						success: function (res) {
							console.log("YOUR RESPONSE FROM THE CONTROLLER", res);
							$('#refPhoto').replaceWith(replacement(res.url, res.photo));
							drawSession.endDraw();
						}
					});
    			})
    		},

    		save: function() {
    			console.log("YOU ENTERED SAAVE");
    			$('#saveDrawing').on('click', function (e) {
    				var dataURL = canvasBottom.toDataURL();
					var photoId = $('#refPhoto').attr('data-photo');
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
							$('#refPhoto').replaceWith(replacement(res.url, res.photo));
							drawSession.endDraw();
						}
					});
    			});
    		}
    	} 

    	drawSession.await();
    	drawSession.skip();
    	drawSession.save();
    	drawSession.skipSave();

		$('#colors').bind('click', function (e) {
    		color = $(e.target).data('fill');
    		$(e.target).fadeOut(200);
    		$(e.target).fadeIn(200);
    		ctx.strokeStyle = color;
		});

		$('.thick').bind('click', function (e) {
			stroke = $(e.target).data('stroke');
			$(e.target).fadeOut(200);
    		$(e.target).fadeIn(200);
			ctx.lineWidth = stroke;
		});


	function replacement(url, photo) {
		new_img = "<img src='" + url + "'" + " data-photo='" + photo + "'" + " id= '" + "refPhoto" + "'" + "class='"+ "pure-img'" + "/>";
		return new_img;
	}

});


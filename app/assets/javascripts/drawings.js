$( document ).ready(function () {
	console.log("Draw page sanity check working!");
	
	//countdown
	function startTimer(duration, display) {
    	var timer = duration, mins, secs;
   		setInterval(function () {
	        mins = parseInt(timer / 60, 10)
	        secs = parseInt(timer % 60, 10);

	        mins = mins < 10 ? "0" + mins : mins;
	        secs = secs < 10 ? "0" + secs : secs;

	        display.text(mins + ":" + secs);
	        if (--timer < 0) {
	            
	        }
    	}, 1000);
	}
	//60 * 2,
    var amountOfTime= 5;
    display = $('#time');

    function startSession() {
    	startTimer(amountOfTime, display);
    	$('#go').hide();
    }

    function endSession() {
    	display.hide();
    	sessionButtons();
    	display.show();
    	startTimer(amountOfTime, display);
    }

    $('#go').on('click', function (e) {
    	startSession();
    });


	//canvas
	var canvas = document.getElementById('drawCanvas');
	var ctx = canvas.getContext('2d');

	var painting = document.getElementById('paint');
	var paint_style = getComputedStyle(painting);
	canvas.width = 425;
	canvas.height = 375;
	// canvas.height = parseInt(paint_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};

	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);

	$('#blueCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#redCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
	});

	$('#thick .fat').on("click", function(e) {
		ctx.lineWidth = 10;
	});

	$('#thick .med').on("click", function(e) {
		ctx.lineWidth = 5;
	});

	$('#thick .thin').on("click", function(e) {
		ctx.lineWidth = 2;
	});

	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = '#00CC99';
	ctx.lineWidth = 2;

	canvas.addEventListener('mousedown', function(e) {
		$('#drawCanvas').css('cursor', 'pointer')
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);

	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);

	var onPaint = function() {
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
	};

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		redraw();
	}

	$('#clicker').on('click', function (e) {
		var dataURL = canvas.toDataURL();
		var photoId = $('#photoRef').attr('data-photo')
		document.getElementById('drawCanvas').src = dataURL;
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
			}
		});
	});

	function replacement(url, photo) {
		new_img = "<img src='" + url + "'" + " data-photo='" + photo + "'" + " id= '" + "photoRef" + "'" + "/>";
		return new_img;
	}

	function sessionButtons() {
		buttons = "<button type='button' disabled>next</button>" + "&nbsp<button type='button' disabled>save</button>";
		$('#sessionButtons').append(buttons);
	}

});
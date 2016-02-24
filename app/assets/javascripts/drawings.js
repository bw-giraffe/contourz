$( document ).ready(function () {
	console.log("Draw page sanity check working!");
	var canvas = document.getElementById('drawCanvas');
	var ctx = canvas.getContext('2d');

	var painting = document.getElementById('paint');
	var paint_style = getComputedStyle(painting);
	canvas.width = 425;
	canvas.height = 375;
	// canvas.height = parseInt(paint_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};

	canvas.addEventListener('mousemove', function(e) {
		console.log("THE MOUSE IS MOVING ON THE CANVAS");

		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);

	$('#blueCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
		console.log("CHANGED COLOR TO BLUE");
	});

	$('#redCircle').on("click", function(e){
		ctx.strokeStyle = $(this).attr('data-fill')
		console.log("CHANGED COLOR TO RED");
	});

	$('#thick .fat').on("click", function(e) {
		ctx.lineWidth = 10;
		console.log("CHANGED THICKNESS TO FAT");
	});

	$('#thick .med').on("click", function(e) {
		ctx.lineWidth = 5;
		console.log("CHANGED THICKNESS TO MED");
	});

	$('#thick .thin').on("click", function(e) {
		ctx.lineWidth = 2;
		console.log("CHANGED THICKNESS TO THIN");
	});

	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = '#00CC99';
	ctx.lineWidth = 2;

	canvas.addEventListener('mousedown', function(e) {
		console.log("YOUR MOUSE IS DOWN");
		$('#drawCanvas').css('cursor', 'pointer')
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);

	canvas.addEventListener('mouseup', function() {
		console.log("YOUR MOUSE IS UP");
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);

	var onPaint = function() {
		console.log("MADE A STROKE");
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
});
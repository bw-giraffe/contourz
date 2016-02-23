$( document ).ready(function () {
	console.log("Draw page sanity check working!");
	var canvas = document.getElementById('drawCanvas');
	var ctx = canvas.getContext('2d');

	var painting = document.getElementById('paint');
	var paint_style = getComputedStyle(painting);
	canvas.width = 400;
	canvas.height = 325;
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

	$('#clicker').on('click', function (e) {
		var dataURL = canvas.toDataURL();
		var photoId = $('#photoRef').attr('data-gallery')
		document.getElementById('drawCanvas').src = dataURL;
		console.log(dataURL);
		$.ajax({
  			type: "POST",
  			url: "/drawing/convert",
			data: {
				data_uri: dataURL,
				photo_id: photoId
			},
		});
	});
});
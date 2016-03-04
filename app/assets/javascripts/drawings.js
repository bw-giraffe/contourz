$( document ).ready(function () {
	console.log("Draw page sanity check working!");
	$('.circle').each(function (e) {
		circFill = $(this).data('fill');
		$(this).css("background", circFill);
	});

	ctx = document.getElementById('mCanvasBottom').getContext('2d');
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
		//might be mCanvasBottom
		$(this).on("touchstart", start);
		$(this).on("touchmove", move);

		$('#colors').bind('touchstart', function (e) {
    		color = $(e.target).data('fill');
    		ctx.strokeStyle = color;
		});
		
});
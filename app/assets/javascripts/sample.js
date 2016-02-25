var curtain = new Image(),
    canvas = document.getElementById('canvasBottom'),
    canvasTop = document.getElementById('canvasTop'),
    ctx = canvas.getContext('2d'),
    ctxMouse = canvasTop.getContext('2d');

curtain.onload = setup;
curtain.src = "http://i63.tinypic.com/zjxo5g.png";

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';

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

function setup() {
    ctxMouse.drawImage(this, 0, 0);
}

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
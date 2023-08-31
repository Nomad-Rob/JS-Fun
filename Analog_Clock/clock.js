// Get the canvas element
var canvas = document.getElementById('canvas');

// Create a 2D drawing context
var ctx = canvas.getContext('2d');

// Calculate the clock radius using half of the canvas height
var radius = canvas.height / 2;

// Move the origin of drawing to the center of the canvas
ctx.translate(radius, radius);

// Reduce the clock radius by 10% for proper scaling
radius = radius * 0.90;

// Refresh the clock every second
setInterval(drawClock, 60);

// Function to draw the complete clock
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

// Function to draw the clock face with an image that fits inside the circle
function drawFace(ctx, radius) {
    var grad;

    // Create a new image object to use as clock face
    var clockFace = new Image();
    clockFace.src = 'halloween pumpkin and ghost.jpg';

    // Draw the clock face
    ctx.drawImage(clockFace, -radius, -radius, radius * 2, radius * 2);

    // Create a radial gradient to draw the outline of the clock face
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);

    // Define the gradient as a color stop
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    // Define the gradient as stroke style
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // Draw the center of the clock
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

// Function to draw clock numbers
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        
        // Change numbers to white
        ctx.fillStyle = num ? 'white' : 'black';
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
        
    }
}

// Function to draw clock hands
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Calculate the angle for the hour hand
    hour = (hour % 12) * Math.PI / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    // Calculate the angle for the minute hand
    minute = (minute * Math.PI / 30) + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

    // Calculate the angle for the second hand
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

// Function to draw clock hands
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full page height
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight; 
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

// Heart object
function Heart(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 20 + 10;
  this.speedY = Math.random() * 2 + 1;
  this.speedX = (Math.random() - 0.5) * 1.5; // drift left/right
  this.opacity = 1;

  // Random pink/red shades
  const colors = [
    "rgba(255,0,80,",   // red
    "rgba(255,105,180,", // hot pink
    "rgba(255,20,147,",  // deep pink
    "rgba(255,99,132,"   // soft red-pink
  ];
  this.color = colors[Math.floor(Math.random() * colors.length)];
}

Heart.prototype.draw = function () {
  ctx.fillStyle = this.color + this.opacity + ")";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(this.x - this.size, this.y - this.size,
                    this.x - this.size * 2, this.y + this.size / 3,
                    this.x, this.y + this.size);
  ctx.bezierCurveTo(this.x + this.size * 2, this.y + this.size / 3,
                    this.x + this.size, this.y - this.size,
                    this.x, this.y);
  ctx.fill();
};

Heart.prototype.update = function () {
  this.y -= this.speedY;
  this.x += this.speedX;
  this.opacity -= 0.01;
};

// Hearts from button (bottom)
function showHearts() {
  setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = canvas.height - 30;
    hearts.push(new Heart(x, y));
  }, 200);
}

// Hearts from Hello Kitty kiss gif
function kittyKissHearts() {
  setInterval(() => {
    let x = canvas.width - 120; // near gif
    let y = 80;
    hearts.push(new Heart(x, y));
  }, 500);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    hearts[i].update();
    if (hearts[i].opacity <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

// Start animation
kittyKissHearts();
animate();

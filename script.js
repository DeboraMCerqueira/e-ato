// blocos interativos
document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("click", () => {
    document.querySelectorAll(".block").forEach(b => b.classList.remove("active"));
    block.classList.add("active");
  });
});

// animação ao aparecer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = "translateY(40px)";
  observer.observe(sec);
});

const canvas = document.getElementById("internet-bg");
const ctx = canvas.getContext("2d");

let width, height;
let points = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const POINTS_QTY = window.innerWidth < 768 ? 40 : 70;
const MAX_DISTANCE = 140;

class Point {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,246,255,0.7)";
    ctx.fill();
  }
}

function init() {
  points = [];
  for (let i = 0; i < POINTS_QTY; i++) {
    points.push(new Point());
  }
}
init();

function connectPoints() {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(0,246,255,${1 - dist / MAX_DISTANCE})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  points.forEach(p => {
    p.move();
    p.draw();
  });

  connectPoints();
  requestAnimationFrame(animate);
}

animate();

/* ===============================
   VER MAIS / VER MENOS
================================ */
document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const details = card.querySelector('.service-details');

    const isOpen = details.style.display === 'block';

    // Fecha todos os outros
    document.querySelectorAll('.service-details').forEach(d => {
      d.style.display = 'none';
    });

    document.querySelectorAll('.toggle-btn').forEach(b => {
      b.textContent = 'Ver mais';
    });

    // Abre o atual se não estava aberto
    if (!isOpen) {
      details.style.display = 'block';
      button.textContent = 'Ver menos';

      // rolagem suave para o card
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ===============================
   CANVAS - INTERNET / UNIVERSO
================================ */
const canvas = document.getElementById('internet-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 90;
const maxDistance = 130;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ===== Partícula ===== */
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 1.5 + 0.5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(94,234,212,0.8)';
    ctx.fill();
  }
}

/* ===== Inicializa ===== */
function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

initParticles();

/* ===== Conexões ===== */
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.strokeStyle = `rgba(56,189,248,${1 - distance / maxDistance})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

/* ===== Loop ===== */
function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.move();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();

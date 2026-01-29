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

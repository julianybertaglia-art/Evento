const assets = window.INLINE_ASSETS || {};
document.querySelectorAll('img').forEach((img) => {
  const src = img.getAttribute('src') || '';
  if (src.includes('hero.webp') && assets.hero) img.src = assets.hero;
  if (src.includes('operation.webp') && assets.operation) img.src = assets.operation;
  if (src.includes('stage.webp') && assets.stage) img.src = assets.stage;
  if (src.includes('proofs-grid.webp') && assets.proofs) img.src = assets.proofs;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

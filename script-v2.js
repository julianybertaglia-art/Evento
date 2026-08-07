const embedded = window.MEDIA_V4 || {};
const media = {
  hero: embedded.hero || 'assets/hero.webp?v=7',
  operation: embedded.operation || 'assets/operation-fixed.webp?v=7',
  stage: embedded.stage || 'assets/stage-fixed.webp?v=7',
  audience: embedded.audience || 'assets/audience-fixed.webp?v=7'
};

document.querySelectorAll('img[data-media]').forEach((img) => {
  const key = img.dataset.media;
  if (!media[key]) return;
  img.src = media[key];
  img.decoding = 'async';
  if (key === 'hero') {
    img.loading = 'eager';
    img.fetchPriority = 'high';
  } else {
    img.loading = 'lazy';
  }
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
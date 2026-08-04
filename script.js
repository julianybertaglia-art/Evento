const mediaFallbacks={
  'assets/hero-stage.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/a0d9cbc2-4d2c-4e8b-a01d-1c390b8734fc/banner-imersao.png',
  'assets/warehouse.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/a0d9cbc2-4d2c-4e8b-a01d-1c390b8734fc/banner-imersao.png',
  'assets/gui-marketplaces.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg',
  'assets/audience.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/a0d9cbc2-4d2c-4e8b-a01d-1c390b8734fc/banner-imersao.png',
  'assets/gui-stage.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg',
  'assets/company.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/a0d9cbc2-4d2c-4e8b-a01d-1c390b8734fc/banner-imersao.png',
  'assets/case-83k.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg',
  'assets/case-gold.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg',
  'assets/case-9k.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg',
  'assets/case-life.jpg':'https://ingresso-navigator.lovable.app/__l5e/assets-v1/ede64784-13bf-4b03-acfa-2dc138cf7c8c/gui-palco.jpg'
};
document.querySelectorAll('img[src^="assets/"]').forEach(img=>{const original=img.getAttribute('src');img.addEventListener('error',()=>{if(mediaFallbacks[original]&&img.src!==mediaFallbacks[original])img.src=mediaFallbacks[original]},{once:true})});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.15});
document.querySelectorAll('.reveal,.statement .wrap,.about-copy,.learn-grid article,.case-grid article,.timeline-list article,.offer-card').forEach(el=>{el.classList.add('reveal');io.observe(el)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
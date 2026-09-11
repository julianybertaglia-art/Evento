const RAW_INDEX = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/index.html';

const heroVideoSource = '<source src="videos/WhatsApp Video 2026-09-10 at 10.48.57.mp4" type="video/mp4">';

const heroTitle = 'VENDA MAIS NO MERCADO LIVRE.<br><em>SEM DEIXAR SUA MARGEM PELO CAMINHO.</em>';
const heroLead = 'Um dia presencial comigo, Gui Nonato, para entender o que realmente move uma operação: produto, margem, anúncios, estoque e decisões que sustentam o crescimento.';

const heroProofBlock = `<div class="hero-proof" aria-label="Números da operação de Gui Nonato">
  <div><b>+R$ 200M</b><span>em vendas no ecommerce</span></div>
  <div><b>+R$ 3M/mês</b><span>em operação própria</span></div>
  <div><b>+30 mil</b><span>pedidos por mês</span></div>
</div>`;

const deliverablesSection = `
<section class="deliverables" id="entregaveis" aria-labelledby="deliverables-title"><div class="wrap">
  <div class="deliverables-head">
    <div><p class="eyebrow">O que você leva</p><h2 id="deliverables-title">Clareza para vender mais sem deixar margem pelo caminho.</h2></div>
    <p>Menos teoria solta. Mais critério para entender produto, anúncio, estoque, caixa e prioridade de crescimento.</p>
  </div>
  <div class="deliverables-grid" aria-label="O que você leva da Imersão Ecommerce">
    <article class="deliverable"><small>01</small><div><h3>Análise real</h3><p>Contas e operações analisadas com critério: produto, margem, reputação, estoque e anúncios.</p></div></article>
    <article class="deliverable"><small>02</small><div><h3>Prioridade clara</h3><p>Saiba onde mexer primeiro para não gastar energia no que não muda resultado.</p></div></article>
    <article class="deliverable"><small>03</small><div><h3>Escala com lucro</h3><p>Entenda como crescer sem virar refém do volume e sem sacrificar margem.</p></div></article>
    <article class="deliverable"><small>04</small><div><h3>Argoplace</h3><p>Receba acesso em primeira mão à ferramenta que conecta operação, dados e decisão.</p></div></article>
  </div>
  <div class="deliverables-cta"><p>O treinamento online Destravando o Mercado Livre também está incluso para complementar o presencial e reforçar a base.</p><a class="button" href="#ingressos">Quero participar</a></div>
</div></section>
`;

const argoplaceLockup = `<div class="argoplace-lockup" aria-label="Argoplace Commerce Navigation">
<svg class="argoplace-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M9 33 33 9 25 34l-5-11L9 33Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 23 33 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
<div><span class="argoplace-word">Argoplace</span><span class="argoplace-tagline">COMMERCE NAVIGATION</span></div>
</div>`;

const cleanBonusBlock = `<div class="bonus-band" id="brinde"><div class="bonus-copy"><p class="eyebrow">Bônus incluso no ingresso</p><h3>Destravando o Mercado Livre</h3><p>Garanta sua vaga na imersão e receba também o treinamento online para reforçar os fundamentos e continuar aplicando depois do presencial.</p></div><div class="bonus-price-box"><span class="bonus-from">Valor do treinamento <del>R$ 197</del></span><strong class="bonus-to">Incluso</strong><span class="bonus-note">Sem custo adicional no ingresso individual ou duplo.</span></div></div>`;

const enhancementScript = `<script>
(function(){
  function playHeroVideo(){
    var video=document.querySelector('.hero-video');
    if(!video)return;
    video.muted=true; video.loop=true; video.autoplay=true; video.playsInline=true;
    video.setAttribute('muted',''); video.setAttribute('autoplay',''); video.setAttribute('loop',''); video.setAttribute('playsinline','');
    var p=video.play&&video.play(); if(p&&p.catch)p.catch(function(){});
  }
  function revealSections(){
    var items=document.querySelectorAll('.deliverables-head,.deliverables-grid,.section-head,.program-heading,.audience,.outcomes,.mentor-grid,.experience-grid,.platform,.bonus-band,.ticket-head,.ticket-grid,.faq-grid,.closing .wrap');
    items.forEach(function(el){el.classList.add('reveal')});
    if(!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('is-visible')});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}})},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }
  document.addEventListener('DOMContentLoaded',function(){playHeroVideo();revealSections();});
  window.addEventListener('load',playHeroVideo);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)playHeroVideo();});
  document.addEventListener('touchstart',playHeroVideo,{once:true,passive:true});
})();
</script>`;

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(RAW_INDEX, { headers: { 'User-Agent': 'imersao-gui-nonato-vercel' } });
    if (!response.ok) throw new Error(`GitHub index fetch failed: ${response.status}`);

    let html = await response.text();

    html = html
      .replace('<video class="hero-video" autoplay muted loop playsinline preload="metadata">','<video class="hero-video" autoplay muted loop playsinline preload="auto" disablepictureinpicture>')
      .replace('<source src="videos/video-3-imersao.mp4" type="video/mp4">', heroVideoSource)
      .replaceAll('controls playsinline preload="none" src="videos/video-1-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-1-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-2-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-2-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-3-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-3-imersao.mp4#t=0.1"');

    html = html
      .replace('Venda melhor no Mercado Livre.<br><em>Saiba o que corrigir, onde investir e como crescer.</em>', heroTitle)
      .replace('Um dia presencial comigo, <b>Gui Nonato</b>, para transformar produto, margem e operação em decisões mais claras para o seu negócio.', heroLead)
      .replace('<div class="hero-cta" id="hero-cta"><a class="button button-yellow" data-placement="hero" href="#ingressos">Quero escolher meu ingresso <span class="arrow" aria-hidden="true">↗</span></a></div>', '<div class="hero-cta" id="hero-cta"><a class="button button-yellow" data-placement="hero" href="#ingressos">Quero participar</a><a class="text-link hero-secondary" href="#conteudo">Ver o conteúdo</a></div>'+heroProofBlock);

    html = html.replace(
      '<p class="hero-price">A partir de <b>R$ 257 à vista</b> · PIX ou cartão.</p>\n<p class="hero-duo">Com sócio ou equipe: <a href="#ingressos">2 ingressos por R$ 297 no total.</a></p>',
      '<div class="hero-event-meta"><span>Tatuapé, São Paulo</span><span>26 de setembro de 2026</span><small>R. Airi, 227 · Vila Gomes Cardim · recepção a partir das 9h30</small></div>'
    );

    html = html.replace('<section class="section social" id="depoimentos-video"', `${deliverablesSection}\n<section class="section social" id="depoimentos-video"`);

    html = html.replace('<p class="platform-name">Argoplace</p><span class="platform-tag">Operação, inteligência e automação.</span>', argoplaceLockup);
    html = html.replace(
      '<h3>Conheça em primeira mão a nova plataforma que usamos na operação.</h3><p>A Argoplace conecta a rotina do seller e conta com a <strong>Mira</strong> para analisar dados, identificar oportunidades e apoiar decisões. Os participantes terão <strong>acesso em primeira mão</strong>.</p><ul class="platform-functions"><li>Produtos e estoque</li><li>Anúncios e mercado</li><li>Expedição e atendimento</li><li>Inteligência e automação</li></ul>',
      '<h3>Acesso em primeira mão à Argoplace.</h3><p>Além da imersão, você recebe acesso em primeira mão à ferramenta que conecta dados, anúncios, estoque e decisões para enxergar a operação com mais clareza.</p><ul class="platform-functions"><li>Produto</li><li>Anúncios</li><li>Estoque</li><li>Decisão</li><li>Margem</li></ul>'
    );

    html = html
      .replace('Veja como é estar na sala com o Gui.', 'Quem senta na sala entende o que precisa mudar.')
      .replace('Relatos de quem já participou de encontros e experiências com a operação. Os vídeos são de edições anteriores.', 'Relatos de quem já viveu experiências presenciais com a operação e saiu com mais clareza sobre o que fazer.')
      .replace('Experiência no presencial</b>Relato de quem participou.', 'Clareza para agir</b>Relato de quem participou.')
      .replace('Troca entre sellers</b>Relato de quem participou.', 'Troca entre sellers</b>Relato de quem participou.')
      .replace('Contato com a operação</b>Relato de quem participou.', 'Operação na prática</b>Relato de quem participou.')
      .replace('Saiba o que analisar, corrigir e priorizar.', 'O que separa faturamento de crescimento saudável.')
      .replace('Produto, anúncios, estoque e caixa se afetam. Na imersão, você vai analisar essas decisões em conjunto.', 'Produto, margem, anúncios, estoque e caixa precisam conversar. Na imersão, você vai entender como analisar essas decisões em conjunto.')
      .replace('Prepare a operação para o crescimento.', 'Venda mais sem perder margem.')
      .replace('Conecte compras, estoque, processos e importação. Veja como avaliar fornecedores e oportunidades sem perder de vista o caixa.', 'Veja como estruturar compras, estoque, anúncios e processos para crescer com mais controle, sem virar refém do volume e sem deixar o lucro pelo caminho.')
      .replace('Estoque · Importação · Processos · Automação', 'Escala · Margem · Processo · Controle')
      .replaceAll('Quero escolher meu ingresso', 'Quero participar')
      .replaceAll('Escolher meu ingresso', 'Quero participar')
      .replace('26 de setembro.<br>Seu próximo passo começa com uma decisão.', '26 de setembro.<br>Um dia para mudar a forma como você olha para sua operação.');

    html = html.replaceAll('Apresentação da Argoplace', 'Acesso em primeira mão da Argoplace');
    html = html.replaceAll('<li>Acesso em primeira mão da Argoplace</li>', '<li>Acesso em primeira mão da Argoplace</li><li class="ticket-gift"><strong>Treinamento Destravando o Mercado Livre incluso</strong></li>');
    html = html.replace(
      '<div class="bonus-band" id="brinde"><div><p class="eyebrow">Incluso nos dois ingressos</p><h3>Treinamento online<br>Destravando o Mercado Livre.</h3></div><p>Você compra a experiência presencial e recebe o treinamento online sem custo adicional. <b>O acesso é liberado pela equipe após a compra.</b></p></div>',
      cleanBonusBlock
    );

    html = html
      .replaceAll(' ↗','')
      .replaceAll('<span class="arrow" aria-hidden="true">↗</span>','')
      .replaceAll('<span aria-hidden="true">↗</span>','');

    html = html.replace(
      '</head>',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="/design-v13.css?v=13">\n</head>'
    );

    html = html.replace('</body>', `${enhancementScript}\n</body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Não foi possível carregar a página neste momento.');
  }
};

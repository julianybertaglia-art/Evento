const RAW_INDEX = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/index.html';

const heroVideoSource = '<source src="videos/WhatsApp Video 2026-09-10 at 10.48.57.mp4" type="video/mp4">';

const deliverablesSection = `
<section class="deliverables" id="entregaveis" aria-labelledby="deliverables-title"><div class="wrap">
  <div class="deliverables-head">
    <div><p class="eyebrow">O que você leva da sala</p><h2 id="deliverables-title">Um dia para sair com clareza do que corrigir primeiro.</h2></div>
    <p>A imersão não é para assistir e ir embora. É para enxergar os gargalos da operação, entender as decisões que mudam margem e sair com próximos passos mais óbvios.</p>
  </div>
  <div class="deliverables-grid" aria-label="Entregáveis da Imersão Ecommerce">
    <article class="deliverable deliverable-feature"><small>01</small><div><h3>Análise de operação ao vivo</h3><p>Veja contas sendo analisadas com critério: produto, margem, anúncios, reputação, estoque e decisão.</p></div></article>
    <article class="deliverable"><small>02</small><div><h3>Mapa de prioridades</h3><p>Entenda onde mexer primeiro para não gastar energia no que não muda o resultado.</p></div></article>
    <article class="deliverable"><small>03</small><div><h3>Visão de escala</h3><p>O que muda quando a operação sai do improviso e começa a crescer com processo.</p></div></article>
    <article class="deliverable"><small>04</small><div><h3>Acesso em primeira mão</h3><p>Conheça a Argoplace: a ferramenta que conecta operação, dados e decisão em uma única direção.</p></div></article>
  </div>
  <div class="deliverables-cta"><p>Também está incluso o treinamento online Destravando o Mercado Livre, para complementar o presencial e ajudar quem ainda precisa estruturar a base.</p><a class="button" href="#ingressos">Ver ingressos e brinde ↗</a></div>
</div></section>
`;

const argoplaceLockup = `<div class="argoplace-lockup" aria-label="Argoplace Commerce Navigation">
<svg class="argoplace-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M9 33 33 9 25 34l-5-11L9 33Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 23 33 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
<div><span class="argoplace-word">Argoplace</span><span class="argoplace-tagline">COMMERCE NAVIGATION</span></div>
</div>`;

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(RAW_INDEX, {
      headers: { 'User-Agent': 'imersao-gui-nonato-vercel' }
    });
    if (!response.ok) throw new Error(`GitHub index fetch failed: ${response.status}`);

    let html = await response.text();

    // Hero video: use the uploaded event video, not testimonial #3.
    html = html.replace(
      '<source src="videos/video-3-imersao.mp4" type="video/mp4">',
      heroVideoSource
    );

    // Better video previews for testimonials.
    html = html
      .replaceAll('controls playsinline preload="none" src="videos/video-1-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-1-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-2-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-2-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-3-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-3-imersao.mp4#t=0.1"');

    // Hero: remove price from the first fold and replace it with date/location clarity.
    html = html.replace(
      '<p class="hero-price">A partir de <b>R$ 257 à vista</b> · PIX ou cartão.</p>\n<p class="hero-duo">Com sócio ou equipe: <a href="#ingressos">2 ingressos por R$ 297 no total.</a></p>',
      '<div class="hero-event-meta"><span>📍 Tatuapé, São Paulo</span><span>📅 26 de setembro de 2026</span><small>R. Airi, 227 · Vila Gomes Cardim · recepção a partir das 9h30</small></div>'
    );

    // Insert deliverables immediately after the hero/marquee, before testimonials.
    html = html.replace(
      '<section class="section social" id="depoimentos-video"',
      `${deliverablesSection}\n<section class="section social" id="depoimentos-video"`
    );

    // Make Argoplace block official and more persuasive.
    html = html.replace(
      '<p class="platform-name">Argoplace</p><span class="platform-tag">Operação, inteligência e automação.</span>',
      argoplaceLockup
    );
    html = html.replace(
      '<h3>Conheça em primeira mão a nova plataforma que usamos na operação.</h3><p>A Argoplace conecta a rotina do seller e conta com a <strong>Mira</strong> para analisar dados, identificar oportunidades e apoiar decisões. Os participantes terão <strong>acesso em primeira mão</strong>.</p><ul class="platform-functions"><li>Produtos e estoque</li><li>Anúncios e mercado</li><li>Expedição e atendimento</li><li>Inteligência e automação</li></ul>',
      '<h3>Marketplace é complexo. Sua operação não precisa ser.</h3><p>A Argoplace organiza dados, anúncios, estoque e próximas decisões em um só lugar. Na imersão, você vê em primeira mão como uma operação ganha clareza quando para de depender de achismo.</p><ul class="platform-functions"><li>Uma operação</li><li>Todos os canais</li><li>Decisão com contexto</li><li>Ação com direção</li></ul>'
    );

    // Ticket checklists and offer language.
    html = html.replaceAll('Apresentação da Argoplace', 'Acesso em primeira mão da Argoplace');
    html = html.replaceAll(
      '<li>Acesso em primeira mão da Argoplace</li>',
      '<li>Acesso em primeira mão da Argoplace</li><li class="ticket-gift"><strong>Brinde: Destravando o Mercado Livre</strong> <del>R$ 197</del></li>'
    );
    html = html.replace(
      '<h3>Treinamento online<br>Destravando o Mercado Livre.</h3></div><p>Você compra a experiência presencial e recebe o treinamento online sem custo adicional. <b>O acesso é liberado pela equipe após a compra.</b></p>',
      '<h3>Brinde confirmado:<br>Destravando o Mercado Livre.</h3></div><p>Você garante a experiência presencial e recebe o treinamento online sem pagar a mais. <b>Valor do treinamento: <span class="bonus-value"><del>R$ 197</del><span>incluso no ingresso</span></span></b></p>'
    );

    // Load Inter + latest conversion CSS after original inline styles.
    html = html.replace(
      '</head>',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700;750;800;850;900&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="/design-v6.css?v=6">\n</head>'
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Não foi possível carregar a página neste momento.');
  }
};

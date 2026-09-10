const RAW_INDEX = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/index.html';

const heroVideoSource = '<source src="videos/WhatsApp Video 2026-09-10 at 10.48.57.mp4" type="video/mp4">';

const heroTitle = 'DESCUBRA AS ESTRATÉGIAS POR TRÁS DE OPERAÇÕES MILIONÁRIAS';
const heroLead = 'Um dia presencial comigo, Gui Nonato, para te mostrar o que realmente faz uma operação vender mais: produto certo, margem saudável, anúncios melhores e decisões mais inteligentes.';

const deliverablesSection = `
<section class="deliverables" id="entregaveis" aria-labelledby="deliverables-title"><div class="wrap">
  <div class="deliverables-head">
    <div><p class="eyebrow">O que você leva</p><h2 id="deliverables-title">Um dia para sair sabendo onde vender mais, onde proteger margem e o que corrigir primeiro.</h2></div>
    <p>Você não vem para assistir mais uma aula. Vem para entender as decisões que aumentam venda sem deixar lucro pelo caminho.</p>
  </div>
  <div class="deliverables-grid" aria-label="O que você leva da Imersão Ecommerce">
    <article class="deliverable deliverable-feature"><small>01</small><div><h3>Análise de operação ao vivo</h3><p>Veja contas sendo analisadas com critério: produto, margem, anúncios, reputação, estoque e decisão.</p></div></article>
    <article class="deliverable"><small>02</small><div><h3>Mapa de prioridades</h3><p>Entenda onde mexer primeiro para vender mais sem desperdiçar tempo e dinheiro no que não muda resultado.</p></div></article>
    <article class="deliverable"><small>03</small><div><h3>Escala com lucro</h3><p>Aprenda como vender mais sem deixar sua margem pelo caminho. Veja o que muda quando a operação cresce de verdade, com mais controle, processo e decisões melhores.</p></div></article>
    <article class="deliverable"><small>04</small><div><h3>Acesso em primeira mão</h3><p>Receba acesso em primeira mão à Argoplace: a ferramenta que conecta operação, dados e decisão em uma única direção.</p></div></article>
  </div>
  <div class="deliverables-cta"><p>Também está incluso o treinamento online Destravando o Mercado Livre, para complementar o presencial e ajudar quem ainda precisa estruturar a base.</p><a class="button" href="#ingressos">Ver ingressos e brinde ↗</a></div>
</div></section>
`;

const argoplaceLockup = `<div class="argoplace-lockup" aria-label="Argoplace Commerce Navigation">
<svg class="argoplace-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M9 33 33 9 25 34l-5-11L9 33Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 23 33 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
<div><span class="argoplace-word">Argoplace</span><span class="argoplace-tagline">COMMERCE NAVIGATION</span></div>
</div>`;

const cleanBonusBlock = `<div class="bonus-band" id="brinde"><div class="bonus-copy"><p class="eyebrow">BÔNUS INCLUSO</p><h3>Destravando o Mercado Livre</h3><p>Treinamento online para complementar a imersão e te ajudar a aplicar os fundamentos com mais clareza.</p><small>Incluso no ingresso individual e no duplo.</small></div><div class="bonus-price-box"><span class="bonus-from">DE <del>R$ 197</del></span><strong class="bonus-to">POR R$ 0</strong><span class="bonus-note">Incluso no seu ingresso</span></div></div>`;

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(RAW_INDEX, {
      headers: { 'User-Agent': 'imersao-gui-nonato-vercel' }
    });
    if (!response.ok) throw new Error(`GitHub index fetch failed: ${response.status}`);

    let html = await response.text();

    html = html.replace(
      '<source src="videos/video-3-imersao.mp4" type="video/mp4">',
      heroVideoSource
    );

    html = html
      .replaceAll('controls playsinline preload="none" src="videos/video-1-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-1-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-2-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-2-imersao.mp4#t=0.1"')
      .replaceAll('controls playsinline preload="none" src="videos/video-3-imersao.mp4#t=0.1"', 'controls playsinline preload="metadata" src="videos/video-3-imersao.mp4#t=0.1"');

    html = html
      .replace('Venda melhor no Mercado Livre.<br><em>Saiba o que corrigir, onde investir e como crescer.</em>', heroTitle)
      .replace('Um dia presencial comigo, <b>Gui Nonato</b>, para transformar produto, margem e operação em decisões mais claras para o seu negócio.', heroLead);

    html = html.replace(
      '<p class="hero-price">A partir de <b>R$ 257 à vista</b> · PIX ou cartão.</p>\n<p class="hero-duo">Com sócio ou equipe: <a href="#ingressos">2 ingressos por R$ 297 no total.</a></p>',
      '<div class="hero-event-meta"><span>📍 Tatuapé, São Paulo</span><span>📅 26 de setembro de 2026</span><small>R. Airi, 227 · Vila Gomes Cardim · recepção a partir das 9h30</small></div>'
    );

    html = html.replace(
      '<section class="section social" id="depoimentos-video"',
      `${deliverablesSection}\n<section class="section social" id="depoimentos-video"`
    );

    html = html.replace(
      '<p class="platform-name">Argoplace</p><span class="platform-tag">Operação, inteligência e automação.</span>',
      argoplaceLockup
    );
    html = html.replace(
      '<h3>Conheça em primeira mão a nova plataforma que usamos na operação.</h3><p>A Argoplace conecta a rotina do seller e conta com a <strong>Mira</strong> para analisar dados, identificar oportunidades e apoiar decisões. Os participantes terão <strong>acesso em primeira mão</strong>.</p><ul class="platform-functions"><li>Produtos e estoque</li><li>Anúncios e mercado</li><li>Expedição e atendimento</li><li>Inteligência e automação</li></ul>',
      '<h3>Receba acesso em primeira mão à Argoplace.</h3><p>Na imersão, você vai conhecer e receber acesso em primeira mão à Argoplace, a ferramenta que usamos para organizar dados, anúncios, estoque e próximas decisões em um só lugar.</p><ul class="platform-functions"><li>Acesso em primeira mão</li><li>Uma operação</li><li>Todos os canais</li><li>Decisão com contexto</li><li>Ação com direção</li></ul>'
    );

    html = html
      .replace('Prepare a operação para o crescimento.', 'Venda mais sem perder margem.')
      .replace('Conecte compras, estoque, processos e importação. Veja como avaliar fornecedores e oportunidades sem perder de vista o caixa.', 'Veja como estruturar compras, estoque, anúncios e processos para crescer com mais controle, sem virar refém do volume e sem deixar o lucro pelo caminho.')
      .replace('Estoque · Importação · Processos · Automação', 'Escala · Margem · Processo · Controle');

    html = html.replaceAll('Apresentação da Argoplace', 'Acesso em primeira mão da Argoplace');
    html = html.replaceAll(
      '<li>Acesso em primeira mão da Argoplace</li>',
      '<li>Acesso em primeira mão da Argoplace</li><li class="ticket-gift"><strong>Brinde: Destravando o Mercado Livre</strong> <del>R$ 197</del></li>'
    );
    html = html.replace(
      '<div class="bonus-band" id="brinde"><div><p class="eyebrow">Incluso nos dois ingressos</p><h3>Treinamento online<br>Destravando o Mercado Livre.</h3></div><p>Você compra a experiência presencial e recebe o treinamento online sem custo adicional. <b>O acesso é liberado pela equipe após a compra.</b></p></div>',
      cleanBonusBlock
    );

    html = html.replace(
      '</head>',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700;750;800;850;900&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="/design-v7.css?v=7">\n<link rel="stylesheet" href="/design-v8.css?v=8">\n<link rel="stylesheet" href="/design-v9.css?v=9">\n<link rel="stylesheet" href="/design-v10.css?v=10">\n</head>'
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Não foi possível carregar a página neste momento.');
  }
};

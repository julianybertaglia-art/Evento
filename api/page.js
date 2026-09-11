const RAW_INDEX = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/index.html';

const heroVideoSource = '<source src="videos/WhatsApp Video 2026-09-10 at 10.48.57.mp4" type="video/mp4">';

const heroTitle = 'DE R$ 100 MIL A +R$ 3 MILHÕES/MÊS.<br><em>O QUE REALMENTE FEZ A OPERAÇÃO ESCALAR.</em>';
const heroLead = 'Em um dia presencial, eu vou abrir os critérios, decisões e processos que fizeram a operação crescer — e mostrar como aplicar esse raciocínio em produto, margem, anúncios, estoque e caixa no seu negócio.';

const heroProofBlock = `<div class="hero-proof" aria-label="Números da operação de Gui Nonato">
  <div><b>+R$ 200M</b><span>em vendas no ecommerce</span></div>
  <div><b>+R$ 3M/mês</b><span>em operação própria</span></div>
  <div><b>+30 mil</b><span>pedidos por mês</span></div>
</div>`;

const deliverablesSection = `
<section class="deliverables" id="entregaveis" aria-labelledby="deliverables-title"><div class="wrap">
  <div class="deliverables-head">
    <div><p class="eyebrow">O que você leva</p><h2 id="deliverables-title">Saia com um plano claro do que corrigir, priorizar e executar na sua operação.</h2></div>
    <p>Você não precisa de mais conteúdo solto. Precisa saber o que fazer primeiro para vender mais, proteger margem e construir crescimento com mais controle.</p>
  </div>
  <div class="deliverables-grid" aria-label="O que você leva da Imersão Ecommerce">
    <article class="deliverable"><small>01</small><div><h3>Diagnóstico de operação</h3><p>Aprenda a identificar onde sua margem, caixa e crescimento estão sendo travados — e quais números realmente merecem sua atenção.</p></div></article>
    <article class="deliverable"><small>02</small><div><h3>Plano de ação</h3><p>Transforme os aprendizados do dia em prioridades práticas para executar na sua operação nos próximos 90 dias.</p></div></article>
    <article class="deliverable"><small>03</small><div><h3>Importação do jeito certo</h3><p>Entenda os critérios para avaliar produto, fornecedor, custo, giro e margem antes de colocar capital em estoque.</p></div></article>
    <article class="deliverable"><small>04</small><div><h3>Acesso à Argoplace</h3><p>Receba acesso em primeira mão à ferramenta que conecta dados, anúncios, estoque e decisão em uma visão mais clara da operação.</p></div></article>
  </div>
  <div class="deliverables-cta"><p>Além do presencial, você ganha o treinamento online completo Destravando o Mercado Livre para usar como material de apoio e revisar os fundamentos quando precisar.</p><a class="button" href="#ingressos">Garantir minha vaga</a></div>
</div></section>
`;

const argoplaceLockup = `<div class="argoplace-lockup" aria-label="Argoplace Commerce Navigation">
<svg class="argoplace-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M9 33 33 9 25 34l-5-11L9 33Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 23 33 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
<div><span class="argoplace-word">Argoplace</span><span class="argoplace-tagline">COMMERCE NAVIGATION</span></div>
</div>`;

const cleanBonusBlock = `<div class="bonus-band" id="brinde"><div class="bonus-copy"><p class="eyebrow">Você não sai só com o evento</p><h3>Ganhe o treinamento completo Destravando o Mercado Livre</h3><p>Use o treinamento como material de apoio para revisar os fundamentos no seu ritmo, consultar quando surgir uma dúvida e continuar aplicando o conteúdo depois da imersão.</p></div><div class="bonus-price-box"><span class="bonus-from">Valor do treinamento <del>R$ 197</del></span><strong class="bonus-to">Incluso</strong><span class="bonus-note">Sem custo adicional no ingresso individual ou duplo.</span></div></div>`;

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
      .replace('<ul class="hero-includes"><li>Evento presencial</li><li>Análises ao vivo</li><li>Prioridades para 90 dias</li></ul>', '<ul class="hero-includes"><li>Estratégias aplicáveis à sua operação</li><li>Análises de contas ao vivo</li><li>Plano de ação para executar</li></ul>')
      .replace('<div class="hero-cta" id="hero-cta"><a class="button button-yellow" data-placement="hero" href="#ingressos">Quero escolher meu ingresso <span class="arrow" aria-hidden="true">↗</span></a></div>', '<div class="hero-cta" id="hero-cta"><a class="button button-yellow" data-placement="hero" href="#ingressos">Garantir minha vaga</a><a class="text-link hero-secondary" href="#conteudo">Ver o conteúdo</a></div>'+heroProofBlock)
      .replace('Vagas limitadas para manter a troca e as análises ao vivo.', 'Vagas limitadas para manter a experiência próxima, prática e com espaço para perguntas.');

    html = html.replace(
      '<p class="hero-price">A partir de <b>R$ 257 à vista</b> · PIX ou cartão.</p>\n<p class="hero-duo">Com sócio ou equipe: <a href="#ingressos">2 ingressos por R$ 297 no total.</a></p>',
      '<div class="hero-event-meta"><span>Tatuapé, São Paulo</span><span>26 de setembro de 2026</span><small>R. Airi, 227 · Vila Gomes Cardim · recepção a partir das 9h30</small></div>'
    );

    html = html.replace('<section class="section social" id="depoimentos-video"', `${deliverablesSection}\n<section class="section social" id="depoimentos-video"`);

    html = html.replace('<p class="platform-name">Argoplace</p><span class="platform-tag">Operação, inteligência e automação.</span>', argoplaceLockup);
    html = html.replace(
      '<h3>Conheça em primeira mão a nova plataforma que usamos na operação.</h3><p>A Argoplace conecta a rotina do seller e conta com a <strong>Mira</strong> para analisar dados, identificar oportunidades e apoiar decisões. Os participantes terão <strong>acesso em primeira mão</strong>.</p><ul class="platform-functions"><li>Produtos e estoque</li><li>Anúncios e mercado</li><li>Expedição e atendimento</li><li>Inteligência e automação</li></ul>',
      '<h3>Enxergue sua operação com os dados que realmente importam.</h3><p>Na imersão, você vai conhecer a Argoplace e receber acesso em primeira mão à ferramenta que usamos para conectar dados, anúncios, estoque e decisões em um só lugar — reduzindo achismo e acelerando a leitura da operação.</p><ul class="platform-functions"><li>Produto</li><li>Anúncios</li><li>Estoque</li><li>Decisão</li><li>Margem</li></ul>'
    );

    html = html
      .replace('Veja como é estar na sala com o Gui.', 'Resultados melhores começam com decisões melhores.')
      .replace('Relatos de quem já participou de encontros e experiências com a operação. Os vídeos são de edições anteriores.', 'Veja relatos e resultados de quem já esteve perto da operação, aplicou novos critérios e passou a tomar decisões com mais clareza.')
      .replace('Experiência no presencial</b>Relato de quem participou.', 'Mais clareza para agir</b>Relato de quem participou.')
      .replace('Troca entre sellers</b>Relato de quem participou.', 'Troca com quem vive o mercado</b>Relato de quem participou.')
      .replace('Contato com a operação</b>Relato de quem participou.', 'Operação na prática</b>Relato de quem participou.')
      .replace('O que você vai sair sabendo fazer', 'O que você vai conseguir aplicar')
      .replace('Saiba o que analisar, corrigir e priorizar.', 'Pare de operar no achismo. Saiba exatamente onde agir.')
      .replace('Produto, anúncios, estoque e caixa se afetam. Na imersão, você vai analisar essas decisões em conjunto.', 'Você vai conectar produto, margem, anúncios, estoque, importação e caixa para descobrir onde está o próximo ganho — e onde sua operação está deixando dinheiro na mesa.')
      .replace('Já vende no Mercado Livre?', 'Já vende e quer escalar com mais lucro?')
      .replace('Vou aprofundar decisões sobre margem, anúncios, estoque, importação e crescimento. Traga os desafios da sua operação e organize suas prioridades.', 'Traga os números e gargalos da sua operação. Vamos aprofundar margem, anúncios, estoque, importação e crescimento para você sair sabendo o que priorizar e onde vale colocar mais energia e capital.')
      .replace('Está começando ou vindo do varejo físico?', 'Está começando e quer evitar erros caros?')
      .replace('Entenda os critérios para avaliar produtos, custos e os primeiros passos da operação. O treinamento online <b>Destravando o Mercado Livre</b> complementa seu aprendizado.', 'Aprenda a avaliar produto, custo, margem e os primeiros passos da operação antes de colocar dinheiro no lugar errado. E leve o treinamento online completo <b>Destravando o Mercado Livre</b> como material de apoio para continuar estudando depois.')
      .replace('Enxergue o que sobra de cada venda.', 'Descubra onde sua margem está indo embora.')
      .replace('Coloque custos, taxas, frete, impostos e Ads na conta. Entenda quais produtos sustentam sua margem e onde seu capital fica preso.', 'Aprenda a colocar custos, taxas, frete, impostos e Ads na conta para identificar quais produtos realmente deixam dinheiro no caixa — e quais só aumentam faturamento sem aumentar lucro.')
      .replace('Saiba onde vale colocar mais dinheiro.', 'Saiba quais anúncios merecem mais investimento.')
      .replace('Analise anúncios, conversão, catálogo e reputação para avaliar o que melhorar, escalar ou pausar no Mercado Livre.', 'Use conversão, catálogo, reputação e dados de anúncio para decidir o que escalar, o que corrigir e o que parar antes de continuar queimando verba.')
      .replace('Prepare a operação para o crescimento.', 'Aprenda a importar do jeito certo.')
      .replace('Conecte compras, estoque, processos e importação. Veja como avaliar fornecedores e oportunidades sem perder de vista o caixa.', 'Entenda os critérios para avaliar fornecedores, produto, custo, margem, giro e momento de compra antes de imobilizar capital em estoque. Importar bem começa antes do pedido.')
      .replace('Estoque · Importação · Processos · Automação', 'Importação · Produto · Estoque · Caixa')
      .replace('Defina suas prioridades para os próximos 90 dias.', 'Saia com um plano de ação para os próximos 90 dias.')
      .replace('Use os aprendizados e as análises de contas ao vivo para organizar o que faz sentido aplicar na sua operação.', 'Transforme o conteúdo, as análises ao vivo e as respostas do dia em prioridades concretas para executar na sua operação quando voltar para casa.')
      .replace('Vou analisar operações selecionadas ao vivo. Você acompanha os critérios, compara com sua realidade e organiza seu plano de ação. O ingresso não garante análise individual da sua conta.', 'Vou analisar operações selecionadas ao vivo e explicar o raciocínio por trás de cada decisão. Mesmo que sua conta não seja escolhida, você acompanha os critérios, compara com sua realidade e leva o método para sua própria operação.')
      .replace('Gui Nonato.<br>Decisões de quem vive a operação.', 'De R$ 100 mil a +R$ 3 milhões por mês.<br>Sem fórmula mágica. Com operação.')
      .replace('Sou empresário e mentor. Vou compartilhar os processos e aprendizados de uma operação que passou de cerca de <b>R$ 500 mil para mais de R$ 3 milhões por mês</b>.', 'Eu vivi cada fase desse crescimento: saí de um faturamento de cerca de <b>R$ 100 mil para mais de R$ 3 milhões por mês</b>. Não foi uma virada de chave. Foi aprender a escolher melhor produto, proteger margem, comprar melhor, anunciar melhor e construir uma operação capaz de sustentar escala.')
      .replace('Na imersão, vou conectar essa experiência aos desafios de produto, margem, importação e gestão que aparecem quando uma operação cresce.', 'Na imersão, eu vou abrir o que aprendi no caminho — inclusive os erros — e transformar essa experiência em critérios que você pode levar para as decisões da sua própria operação.')
      .replace('Traga seus desafios.<br>Amplie sua visão.', 'Um dia que pode encurtar meses de tentativa e erro.')
      .replace('Estar na mesma sala permite comparar decisões, ouvir outros sellers e levar perguntas sobre a sua realidade.', 'Traga suas dúvidas, compare sua operação com outros sellers e aproveite um dia inteiro para fazer perguntas que normalmente custariam semanas de tentativa, erro e pesquisa para responder sozinho.')
      .replace('Análises de contas ao vivo com o Gui', 'Análises de operações e contas ao vivo')
      .replace('Perguntas e troca de experiências', 'Perguntas diretas sobre os desafios da sua operação')
      .replace('Networking e coffee break inclusos', 'Networking com outros sellers e empresários')
      .replace('Escolha como você vai participar.', 'Garanta sua vaga e venha construir o próximo nível da sua operação.')
      .replace('Individual ou duplo. Leve um sócio ou colaborador por apenas <b>R$ 40 a mais</b>.', 'Venha sozinho ou traga quem decide e executa com você. No ingresso duplo, a segunda pessoa entra por apenas <b>R$ 40 a mais</b>.')
      .replace('Um dia para olhar sua operação com mais clareza e organizar os próximos passos.', 'Um dia inteiro para identificar gargalos, encontrar oportunidades e voltar para sua operação com um plano mais claro de execução.')
      .replace('Leve quem decide ou executa com você e saiam com as mesmas prioridades.', 'Traga seu sócio ou alguém-chave da equipe para que vocês ouçam as mesmas estratégias, alinhem decisões e voltem prontos para executar juntos.')
      .replaceAll('Quero escolher meu ingresso', 'Garantir minha vaga')
      .replaceAll('Escolher meu ingresso', 'Garantir minha vaga')
      .replaceAll('Quero participar', 'Garantir minha vaga')
      .replace('Precisa entender se o evento faz sentido para o seu momento?', 'Veja as respostas para as dúvidas mais comuns antes de garantir sua vaga.')
      .replace('Não. Se está começando, você poderá entender critérios para avaliar produtos, custos e os primeiros passos da operação. Se já vende, poderá aprofundar suas decisões sobre margem, anúncios, estoque e crescimento. O treinamento online Destravando o Mercado Livre está incluso para complementar o aprendizado.', 'Não. Se está começando, você vai aprender critérios para escolher produto, calcular custos e evitar erros caros nos primeiros passos. Se já vende, o foco é aprofundar decisões de margem, anúncios, estoque, importação e escala. E o treinamento online completo Destravando o Mercado Livre fica como material de apoio depois do evento.')
      .replace('O brinde é o treinamento online <b>Destravando o Mercado Livre</b>, incluído sem custo adicional na compra do ingresso individual ou duplo. Após a compra, a equipe orienta a liberação do acesso. Caso precise de ajuda, fale pelo WhatsApp <a href="https://wa.me/5511923990244" target="_blank" rel="noopener">(11) 92399-0244</a>.', 'Você ganha o treinamento online completo <b>Destravando o Mercado Livre</b>, avaliado em R$ 197, sem custo adicional. Ele funciona como material de apoio para revisar fundamentos e continuar aplicando o conteúdo depois da imersão. Após a compra, a equipe orienta a liberação do acesso. Caso precise de ajuda, fale pelo WhatsApp <a href="https://wa.me/5511923990244" target="_blank" rel="noopener">(11) 92399-0244</a>.')
      .replace('26 de setembro.<br>Seu próximo passo começa com uma decisão.', '26 de setembro.<br>Volte para sua operação sabendo o que fazer na segunda-feira.')
      .replaceAll('Ver ingressos', 'Garantir minha vaga');

    html = html.replaceAll('Apresentação da Argoplace', 'Acesso em primeira mão da Argoplace');
    html = html.replaceAll('<li>Acesso em primeira mão da Argoplace</li>', '<li>Acesso em primeira mão da Argoplace</li><li class="ticket-gift"><strong>Treinamento completo Destravando o Mercado Livre incluso</strong></li>');
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
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="/design-v13.css?v=13">\n<link rel="stylesheet" href="/design-v14.css?v=14">\n</head>'
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

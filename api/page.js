const RAW_INDEX = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/index.html';

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(RAW_INDEX, {
      headers: { 'User-Agent': 'imersao-gui-nonato-vercel' }
    });
    if (!response.ok) throw new Error(`GitHub index fetch failed: ${response.status}`);

    let html = await response.text();

    // Change ONLY the hero source; the same video remains available as testimonial #3 below.
    html = html.replace(
      '<source src="videos/video-3-imersao.mp4" type="video/mp4">',
      '<source src="/api/hero-video" type="video/mp4">'
    );

    // Load the editorial layout pass after the page's original CSS, so it acts as a clean override.
    html = html.replace(
      '</head>',
      '<link rel="stylesheet" href="/design-v5.css?v=5">\n</head>'
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Não foi possível carregar a página neste momento.');
  }
};

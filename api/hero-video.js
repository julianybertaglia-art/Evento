const HERO_VIDEO = 'https://raw.githubusercontent.com/julianybertaglia-art/Evento/main/videos/WhatsApp%20Video%202026-09-10%20at%2010.48.57.mp4';

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(HERO_VIDEO, {
      headers: { 'User-Agent': 'imersao-gui-nonato-vercel' }
    });

    if (!response.ok || !response.body) {
      throw new Error(`Hero video fetch failed: ${response.status}`);
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200);

    if (response.body.pipe) {
      response.body.pipe(res);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error(error);
    res.status(502).send('Hero video unavailable');
  }
};

const CACHE = 'imersao-ecommerce-apresentacao-v5-reorder-offline';
const ASSETS = [
  './',
  './index.html',
  './assets/1.jpg',
  './assets/2.jpg',
  './assets/3.jpg',
  './assets/4.jpg',
  './assets/5.jpg',
  './assets/6.jpg',
  './assets/7.jpg',
  './assets/8.jpg',
  './assets/9.jpg',
  './assets/10.jpg',
  './assets/11.jpg',
  './assets/12.jpg',
  './assets/13.jpg',
  './assets/14.jpg',
  './assets/15.jpg',
  './assets/16.jpg',
  './assets/17.jpg',
  './assets/18.jpg',
  './assets/19.jpg',
  './assets/20.jpg',
  './assets/62c967bd-f9ee-431b-8196-d00fcce24538.png',
  './assets/Apresentação A - Gui Nonato (15).jpg',
  './assets/Apresentação A - Gui Nonato (16).jpg',
  './assets/Apresentação A - Gui Nonato (17).jpg'
];

const OLD_SLIDES = `const SLIDES=[
{src:'assets/1.jpg',kind:'opening',label:'abertura'},
{src:'assets/2.jpg',kind:'image',label:'imersão'},
{src:'assets/3.jpg',kind:'image',label:'imersão'},
{src:'assets/4.jpg',kind:'image',label:'imersão'},
{src:'assets/5.jpg',kind:'image',label:'imersão'},
{src:'assets/6.jpg',kind:'image',label:'imersão'},
{src:null,kind:'market',label:'marketplaces'},
{src:'assets/7.jpg',kind:'image',label:'imersão'},
{src:'assets/8.jpg',kind:'image',label:'imersão'},
{src:'assets/9.jpg',kind:'image',label:'imersão'},
{src:'assets/10.jpg',kind:'image',label:'imersão'},
{src:'assets/11.jpg',kind:'image',label:'imersão'},
{src:'assets/12.jpg',kind:'image',label:'imersão'},
{src:null,kind:'lunch',label:'almoço'},
{src:'assets/14.jpg',kind:'image',label:'patrocinador'},
{src:'assets/15.jpg',kind:'image',label:'argo'},
{src:'assets/16.jpg',kind:'image',label:'mercado livre'},
{src:'assets/62c967bd-f9ee-431b-8196-d00fcce24538.png',kind:'image',label:'formulário'},
{src:'assets/18.jpg',kind:'image',label:'imersão'},
{src:'assets/Apresentação A - Gui Nonato (16).jpg',kind:'closing',label:'mentoria'},
{src:'assets/Apresentação A - Gui Nonato (17).jpg',kind:'image',label:'inscrição'}
];`;

const NEW_SLIDES = `const SLIDES=[
{src:'assets/1.jpg',kind:'opening',label:'abertura'},
{src:'assets/2.jpg',kind:'image',label:'imersão'},
{src:'assets/3.jpg',kind:'image',label:'imersão'},
{src:'assets/4.jpg',kind:'image',label:'imersão'},
{src:'assets/5.jpg',kind:'image',label:'imersão'},
{src:'assets/6.jpg',kind:'image',label:'imersão'},
{src:null,kind:'market',label:'marketplaces'},
{src:'assets/16.jpg',kind:'image',label:'mercado livre'},
{src:null,kind:'lunch',label:'almoço'},
{src:'assets/14.jpg',kind:'image',label:'patrocinador'},
{src:'assets/7.jpg',kind:'image',label:'importação'},
{src:'assets/8.jpg',kind:'image',label:'importação'},
{src:'assets/9.jpg',kind:'image',label:'importação'},
{src:'assets/10.jpg',kind:'image',label:'importação'},
{src:'assets/11.jpg',kind:'image',label:'importação'},
{src:'assets/12.jpg',kind:'image',label:'importação'},
{src:'assets/15.jpg',kind:'image',label:'argo'},
{src:'assets/62c967bd-f9ee-431b-8196-d00fcce24538.png',kind:'image',label:'formulário'},
{src:'assets/18.jpg',kind:'image',label:'imersão'},
{src:'assets/Apresentação A - Gui Nonato (16).jpg',kind:'closing',label:'mentoria'},
{src:'assets/Apresentação A - Gui Nonato (17).jpg',kind:'image',label:'inscrição'}
];`;

function applyOrder(html) {
  return html && html.includes(OLD_SLIDES) ? html.replace(OLD_SLIDES, NEW_SLIDES) : html;
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const isIndex = request.mode === 'navigate' || url.pathname.endsWith('/apresentacao/') || url.pathname.endsWith('/apresentacao/index.html');

  if (isIndex) {
    event.respondWith(
      fetch(request)
        .then(response => response.text())
        .catch(() => caches.match('./index.html', { ignoreSearch: true }).then(r => r && r.text()))
        .then(html => new Response(applyOrder(html || ''), { headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        const copy = response.clone();
        if (response.ok && url.origin === location.origin) {
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

const CACHE = 'imersao-ecommerce-apresentacao-v8-final-qr-pix';
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
  './assets/14.jpg',
  './assets/15.jpg',
  './assets/16.jpg',
  './assets/18.jpg',
  './assets/62c967bd-f9ee-431b-8196-d00fcce24538.png',
  './assets/Apresentação A - Gui Nonato (16).jpg',
  './assets/Apresentação A - Gui Nonato (19).jpg'
];

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
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res.ok && url.origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});

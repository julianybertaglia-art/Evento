const CACHE = 'imersao-ecommerce-apresentacao-v3-1920-offline';
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

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        const copy = response.clone();
        if (response.ok && new URL(request.url).origin === location.origin) {
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('./index.html');
        return caches.match(request);
      });
    })
  );
});

const CACHE_NAME = 'hallouyun-v71-1';
const ASSETS = [
  './index.html',
  './rental.html',
  './manifest.json',
  './manifest-rental.json',
  './sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Pakai Promise.allSettled supaya 1 file gagal tidak bikin seluruh SW gagal install
        return Promise.allSettled(
          ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('Gagal cache:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Hanya handle request same-origin GET
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Hanya cache response yang valid & same-origin
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback ke index.html kalau offline & request navigasi
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return cached;
        });
    })
  );
});

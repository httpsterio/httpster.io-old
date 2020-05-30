const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/main.css',
  'fonts/Inter-roman.var-subset.woff2?v=3.13',
  'blog/'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
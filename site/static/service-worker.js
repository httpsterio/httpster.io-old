const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('site-link');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}

const CACHE_KEY = `httpster-${process.env.BUILD_ID}`;

// URLS that we don’t want to end up in the cache
const EXCLUDED_URLS = [];

// URLS that we want to be cached when the worker is installed
const PRE_CACHE = ["/", "/posts", "/fonts/Inter-roman.var-subset.woff2?v=3.13"];

// You might want to bypass a certain host
const IGNORED_HOSTS = [];

const addToCache = function (items) {
  caches.open(CACHE_KEY).then(cache => cache.addAll(items));
};

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  // Look for any old caches that don't match our set and clear them out
  evt.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          item => !Object.values(CACHE_KEY).includes(item)
        );
      })
      .then(itemsToDelete => {
        return Promise.all(
          itemsToDelete.map(item => {
            return caches.delete(item);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  // Ignore hosts
  const { hostname } = new URL(event.request.url);
  event.respondWith(fetch(event.request));
  if (IGNORED_HOSTS.indexOf(hostname) >= 0) {
    return;
  }

  // Ignore URLs
  if (EXCLUDED_URLS.some(page => event.request.url.indexOf(page) > -1)) {
    return;
  }

  // Respond with cache first but complete network request and update cache if possible
  return caches.open(CACHE_KEY).then(cache => {
    return cache.match(event.request).then(response => {
      var fetchPromise = fetch(event.request).then(networkResponse => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
      return response || fetchPromise;
    });
  });
});

self.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle('hidden', false);
});

self.addEventListener('click', () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then((result) => {
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden', true);
  });
});

self.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});

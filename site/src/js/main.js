// Write your javascript here...
// ES6 will be compiled with Webpack

const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Put code here */



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
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}

import lozad from "lozad";

const supportsLazyLoad = "loading" in document.createElement("img");

const supportsIntersectionObserver =
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

const images = document.querySelectorAll("main article img");
if (supportsLazyLoad || !supportsIntersectionObserver) {
  // If the browser supports native lazy loading
  // or doesn't support interSection observer
  // set the src and let the browser handle it
  images.forEach(node => {
    node.setAttribute("src", node.getAttribute("data-src"));
    node.removeAttribute("data-src");
  });
} else {
  // If the browser supports interSection observer
  // but not native lazy loading let's polyfill
  const observer = lozad(images);
  observer.observe();
}

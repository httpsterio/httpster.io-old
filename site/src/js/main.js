// Write your javascript here...
// ES6 will be compiled with Webpack

// import lozad from node modules
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
  images.forEach(image => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.removeAttribute("data-src");
    console.log("lazyload success");
  });
} else {
  // If the browser supports interSection observer
  // but not native lazy loading let's polyfill
  const observer = lozad(images);
  observer.observe();
  console.log("polyfilling lazyloading");
}
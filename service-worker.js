const CACHE_NAME = "ogcen-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./heartbeat.mp3",
  "./images-bg1.jpg",
  "./images-bg2.jpg",
  "./images-bg3.jpg",
  "./images-bg4.jpg",
  "./images-bg5.jpg",
  "./images-bg6.jpg",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

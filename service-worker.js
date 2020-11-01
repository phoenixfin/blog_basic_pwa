const CACHE_NAME = "phoenixfin";
var urlsToCache = [
  "/",
  "/nav.html",
  "/manifest.json",
  "/icon.png",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/booklet.html",
  "/pages/kolektif.html",    
  "/css/materialize.min.css",
  "/css/materialize.css",    
  "/css/master.css",
  "/js/materialize.min.js",
  "/js/materialize.js",    
  "/js/nav.js",
  "/public/images/profile.jpg",
  "/public/images/about.jpg",
  "/public/images/cover/booklet1.jpg",
  "/public/images/cover/booklet2.jpg",
  "/public/images/cover/booklet3.jpg",
  "/public/images/kolektif/dzarratul_hikmah.jpg",
  "/public/images/kolektif/itb-nyastra.jpg",
  "/public/images/kolektif/jurnal-kebangkitan.jpg",
  "/public/images/kolektif/literaksi.jpg",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
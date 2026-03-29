// Service Worker dla PWA - Offline Support
const CACHE_NAME = 'ndes1gn-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/portfolio.html',
  '/o-mnie.html',
  '/kontakt.html',
  '/style.css',
  '/logo.png',
  '/manifest.json'
];

// Instalacja Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache otwarty');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktywacja Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Usuwanie starego cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - strategia Network First, fallback do Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Klonuj odpowiedź
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // Jeśli brak połączenia, użyj cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // Fallback dla stron HTML
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
          });
      })
  );
});


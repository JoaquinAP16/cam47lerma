// Service Worker para funcionamiento offline - Versión Demo
const CACHE_NAME = 'menu-interactivo-demo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/utils/demo-data-service.js',
  '/utils/ui-helpers.js',
  '/components/icon-gallery.js',
  '/components/practice-mode.js',
  '/components/student-selector.js',
  '/components/category-grid.js',
  '/components/product-grid.js',
  '/components/order-summary.js',
  '/components/confirmation.js',
  '/components/admin-panel.js',
  '/components/app.js',
  '/main.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Cache First, fallback to Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devolver respuesta de caché
        if (response) {
          return response;
        }
        
        // Si no está en caché, buscar en la red
        return fetch(event.request)
          .then(response => {
            // Si la respuesta no es válida, devolver directamente
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para poder almacenarla en caché
            const responseToCache = response.clone();
            
            // Almacenar en caché
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Service Worker -> kann auch eine leere JavaScript Datei sein

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('fxcalc-v1')
            .then(cache => cache.addAll([
                './',
                './index.html',
                './app.js',
                './icon512.png',
                './maskable-icon512.png',
                './icon192.png',
                './icon16.png',
                './fixer.json',
                './manifest.webmanifest'
            ]))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open('fxcalc-v1').then((cache) => {
            return fetch(event.request) // request at the network
                .then((response) => { // request successful (online)
                    cache.put(event.request, response.clone());
                    return response;
                })
                .catch(() => cache.match(event.request)); // request not deliverable to network (offline)
        })
    );
});
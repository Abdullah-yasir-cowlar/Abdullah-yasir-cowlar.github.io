let cacheName = 'cache_v12'

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js',
]

// install event
self.addEventListener('install', e => {
    console.log('Service worker installed')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service worker is caching files')
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
})

// activate event
self.addEventListener('activate', e => {
    console.log('Service worker is activated')

    // remove unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker is clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// call fetch event
self.addEventListener('fetch', e => {
    console.log('Service worker is fetching')
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})

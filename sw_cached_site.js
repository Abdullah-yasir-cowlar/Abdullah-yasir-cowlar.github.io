let cacheName = 'cache_v2'

// install event
self.addEventListener('install', e => {
    console.log('Service worker installed')
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
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // make copy of response
                const resClone = res.clone()

                // open cache
                caches.open(cacheName).then(cache => {
                    // add response to cache
                    cache.put(e.request, resClone)
                })

                return res
            })
            .catch(err => caches.match(e.request).then(res => res))
    )
})

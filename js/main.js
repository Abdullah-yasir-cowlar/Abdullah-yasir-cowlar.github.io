if (navigator.serviceWorker) {
    console.log('serviceWorkers are supported')

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('serverWorker registered'))
            .catch(err =>
                console.log('err while registering serviceWorker', err)
            )
    })
}

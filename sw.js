var cacheName = 'v1';  
self.addEventListener('install', event => { 
  event.waitUntil(
    caches.open(cacheName)                  
    .then(cache => cache.addAll([
      'ICON.png',
      'index.html',
      'signaturepad.c097ed10260cafa00fee.js'
    ]))
  );
});
 
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    let responsePre = response&&response.clone()||null;
    return fetch(event.request).then(function (response) {
      let responseClone = response.clone();
      caches.open('v1').then(function (cache) {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(function () {
      if (responsePre !== null) {
        return responsePre
      } else {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      }
    });
  }));
});
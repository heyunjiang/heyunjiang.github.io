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
  
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)                  
    .then(function (response) {
      if (response) {                            
        return response;                         
      }
      var requestToCache = event.request.clone();  //          
      return fetch(requestToCache).then(                   
        function (response) {
          if (!response || response.status !== 200) {      
            return response;
          }
          var responseToCache = response.clone();          
          caches.open(cacheName)                           
            .then(function (cache) {
              cache.put(requestToCache, responseToCache);  
            });
          return response;             
    })
  );
});
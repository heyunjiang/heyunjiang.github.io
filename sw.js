const version = 'v2'
const cachedFiles = [
  '/',
  '/index.html',
  '/app.js'
]
console.log(self)
self.addEventListener('install', function(event) {
  event.waitUntil(
    /*caches.open(version).then(function(cache) {
      return cache.addAll(cachedFiles);
    })*/
    self.skipWaiting() // 强制我这里就是最新的
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== version) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
  // 激活成功
  console.log("激活成功")
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // 在线的ajax请求，必须重新获取
    if (response !== undefined) {
      console.log('请求到旧数据')
      return response;
    } else {
      console.log(event.request, '发起新的数据')
      return fetch(event.request).then(function (response) {
        if(!response || response.status !== 200) {
          return response
        }

        let responseClone = response.clone();
        caches.open(version).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function (e) {
        return e;
      });
    }
  }));
});

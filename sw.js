const version = 'v1'
const cachedFiles = [
  '/',
  '/index.html',
  '/app.js'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll(cachedFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      console.log('请求到旧数据')
      return response;
    } else {
      console.log(event.request, '发起新的数据') // 通过这里来验证 ajax 数据请求是否也会被sw拦截
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

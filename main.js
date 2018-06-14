/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var appCacheIframe;

function hasSW() {
  return 'serviceWorker' in navigator &&
    // This is how I block Chrome 40 and detect Chrome 41, because first has
    // bugs with history.pustState and/or hashchange
    (window.fetch || 'imageRendering' in document.documentElement.style) &&
    (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname.indexOf('127.') === 0)
}

function install(options) {
  options || (options = {});

  
    if (hasSW()) {
      var registration = navigator.serviceWorker
        .register(
          "\\sw.js"
          
        );

      
        var handleUpdating = function(registration) {
          var sw = registration.installing || registration.waiting;
          var ignoreInstalling;
          var ignoreWaiting;

          // No SW or already handled
          if (!sw || sw.onstatechange) return;

          var stateChangeHandler;

          // Already has SW
          if (registration.active) {
            onUpdateStateChange();
            stateChangeHandler = onUpdateStateChange;
          } else {
            onInstallStateChange();
            stateChangeHandler = onInstallStateChange;
          }

          ignoreInstalling = true;
          if (registration.waiting) {
            ignoreWaiting = true;
          }

          sw.onstatechange = stateChangeHandler;

          function onUpdateStateChange() {
            switch (sw.state) {
              case 'redundant': {
                sendEvent('onUpdateFailed');
                sw.onstatechange = null;
              } break;

              case 'installing': {
                if (!ignoreInstalling) {
                  sendEvent('onUpdating');
                }
              } break;

              case 'installed': {
                if (!ignoreWaiting) {
                  sendEvent('onUpdateReady');
                }
              } break;

              case 'activated': {
                sendEvent('onUpdated');
                sw.onstatechange = null;
              } break;
            }
          }

          function onInstallStateChange() {
            switch (sw.state) {
              case 'redundant': {
                // Failed to install, ignore
                sw.onstatechange = null;
              } break;

              case 'installing': {
                // Installing, ignore
              } break;

              case 'installed': {
                // Installed, wait activation
              } break;

              case 'activated': {
                sendEvent('onInstalled');
                sw.onstatechange = null;
              } break;
            }
          }
        };

        var sendEvent = function(event) {
          if (typeof options[event] === 'function') {
            options[event]({
              source: 'ServiceWorker'
            });
          }
        };

        registration.then(function(reg) {
          // WTF no reg?
          if (!reg) return;

          // Installed but Shift-Reloaded (page is not controller by SW),
          // update might be ready at this point (more than one tab opened).
          // Anyway, if page is hard-reloaded, then it probably already have latest version
          // but it's not controlled by SW yet. Applying update will claim this page
          // to be controlled by SW. Maybe set flag to not reload it?
          // if (!navigator.serviceWorker.controller) return;

          handleUpdating(reg);
          reg.onupdatefound = function() {
            handleUpdating(reg);
          };
        }).catch(function(err) {
          sendEvent('onError');
          return Promise.reject(err);
        });
      

      return;
    }
  

  
    if (window.applicationCache) {
      var directory = "\\appcache\\";
      var name = "manifest";

      var doLoad = function() {
        var page = directory + name + '.html';
        var iframe = document.createElement('iframe');

        
          window.addEventListener('message', function(e) {
            if (e.source !== iframe.contentWindow) return;

            var match = (e.data + '').match(/__offline-plugin_AppCacheEvent:(\w+)/);
            if (!match) return;
            var event = match[1];

            if (typeof options[event] === 'function') {
              options[event]({
                source: 'AppCache'
              });
            }
          });
        

        iframe.src = page;
        iframe.style.display = 'none';

        appCacheIframe = iframe;
        document.body.appendChild(iframe);
      };

      if (document.readyState === 'complete') {
        setTimeout(doLoad);
      } else {
        window.addEventListener('load', doLoad);
      }

      return;
    }
  
}

function applyUpdate(callback, errback) {
  
    if (hasSW()) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        if (!registration || !registration.waiting) {
          errback && errback();
          return;
        }

        registration.waiting.postMessage({
          action: 'skipWaiting'
        });

        callback && callback();
      });

      return;
    }
  

  
    if (appCacheIframe) {
      try {
        appCacheIframe.contentWindow.__applyUpdate();
        callback && setTimeout(callback);
      } catch (e) {
        errback && setTimeout(errback);
      }
    }
  
}

function update() {
  
    if (hasSW()) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        if (!registration) return;
        return registration.update();
      });
    }
  

  
    if (appCacheIframe) {
      try {
        appCacheIframe.contentWindow.applicationCache.update();
      } catch (e) {}
    }
  
}



exports.install = install;
exports.applyUpdate = applyUpdate;
exports.update = update;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

var OfflinePlugin = __webpack_require__(1);

OfflinePlugin.install({
  onInstalled: function() {
    openOfflineReady();
  },

  onUpdating: function() {

  },

  onUpdateReady: function() {
    OfflinePlugin.applyUpdate();
  },
  onUpdated: function() {
    window.location.reload();
  }
});

var hexagon = document.querySelector('#hexagon');
var offlineReady = document.querySelector('#offline-ready');
var offlineReadyClose = document.querySelector('#offline-ready-close');
var wifiShape = document.querySelector('#wifi-shape');

(function() {
  var rotation = 0;

  setInterval(function() {
    if (rotation === 300) {
      rotation = -60;
      hexagon.removeAttribute('data-animation');
      hexagon.style.transform = 'rotate(' + rotation + 'deg)';
    }

    rotation = rotation + 60;

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        hexagon.setAttribute('data-animation', '');
        hexagon.style.transform = 'rotate(' + rotation + 'deg)';
      })
    });
  }, 3000);
}());

offlineReadyClose.addEventListener('click', function() {
  closeOfflineReady()
});

window.addEventListener('offline', function() {
  goOffline();
});

window.addEventListener('online', function() {
  requestAnimationFrame(function() {
    wifiShape.classList.remove('wifi-offline');
    requestAnimationFrame(function() {
      wifiShape.classList.add('wifi-online');
    });
  });
});

if (!navigator.onLine) {
  setTimeout(function() {
    goOffline();
  }, 300);
}

function goOffline() {
  requestAnimationFrame(function() {
    wifiShape.classList.remove('wifi-online');
    requestAnimationFrame(function() {
      wifiShape.classList.add('wifi-offline');
    });
  });
}

function openOfflineReady() {
  requestAnimationFrame(function() {
    offlineReady.setAttribute('data-open', '');
  });

  setTimeout(closeOfflineReady, 30 * 1000);
}

function closeOfflineReady() {
  requestAnimationFrame(function() {
    offlineReady.removeAttribute('data-open');
  });
}

/***/ })
/******/ ]);
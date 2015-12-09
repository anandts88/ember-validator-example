(function() {
  /* Application Boot */
  var head = document.getElementsByTagName('head')[0];
  var appendScript = function(script) {
   var scriptTag = document.createElement('script');
   scriptTag.src = script;
   scriptTag.type = 'text/javascript';
   head.appendChild(scriptTag);
   return scriptTag;
  };

  var appendStyle = function(style) {
   var linkTag  = document.createElement('link');
   linkTag.rel  = 'stylesheet'
   linkTag.href = style;
   linkTag.type = 'text/css'
   head.appendChild(linkTag);
   return linkTag;
  };

  var query = window.location.search.substring(1);
  var queryParams = {};
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
   var pair = vars[i].split("=");
   queryParams[pair[0]] = pair[1];
  }

  var cssFile, jsFile, key, extraJSFiles, vendorScript, appStr;
  var ENV = JSON.parse(unescape(document.getElementsByName('ember-validator-example/config/environment')[0].content));
  if (ENV.EmberENV.mobileBuild) {
    __device.mobile = true;
  }
  if (queryParams['fullsite']) {
    __device.mobile = false;
  }

  if (__device.mobile) {
    appendStyle(document.getElementById('vendor-mobile-css').getAttribute('content'));
    vendorScript = appendScript(document.getElementById('vendor-mobile-js').getAttribute('content'));
    cssFile    = appendStyle(document.getElementById('mobile-css').getAttribute('content'));
    jsFile     = document.getElementById('mobile-js').getAttribute('content');
  } else {
    appendStyle(document.getElementById('vendor-desktop-css').getAttribute('content'));
    vendorScript = appendScript(document.getElementById('vendor-desktop-js').getAttribute('content'));
    cssFile = appendStyle(document.getElementById('desktop-css').getAttribute('content'));
    jsFile  = document.getElementById('desktop-js').getAttribute('content');
  }

  function loadScript(script, callback){
    if (script.readyState) {  //IE
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState == 'complete'){
          script.onreadystatechange = null;
          if (callback) {
            callback();
          }
        }
      };
    } else {  //Others
      script.onload = function(){
        if (callback) {
          callback();
        }
      };
    }
  }

  function AppBootPromise(resolver) {
    this.resolver = resolver;
    this.resolved = false;
    this.resolve = function() {
      this.resolved = true;
    };
  }

  function all(promises, resolver) {
    promises.forEach(function(promise) {
      promise.resolver(function() {
        var resolved = 0;

        promise.resolve();

        promises.forEach(function(p) {
          if (p.resolved) {
            ++resolved;
          }
        });

        if (resolved === promises.length) {
          resolver();
        }

      });
    });
  };

  loadScript(vendorScript, function() {
    loadScript(appendScript(jsFile));
  });
})();

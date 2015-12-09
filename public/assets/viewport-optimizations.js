(function() {
  var meta,
      fragment = document.createDocumentFragment();

  if (__device.mobile) {
    /*
      "The Magic Viewport" [https://www.youtube.com/watch?v=3Bq521dIjCM#t=1273]
      Allows Chrome GPU rasterization on a set of android devices
    */
    // document.getElementById("viewport").setAttribute("content","width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes");
    meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes";
    fragment.appendChild(meta);


    /*
      Mobile viewport optimizations:
        <!-- Run in full-screen mode: Android (when launched from home screen) -->
        <meta name="mobile-web-app-capable" content="yes">

        <!-- Run in full-screen mode: iOS (when launched from home screen) -->
        <meta name="apple-mobile-web-app-capable" content="yes">

        <!-- Make the status bar black with white text (when launched from home screen) -->
        <!-- https://gist.github.com/tfausak/2222823#comment-1284496 -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <!-- Customize home screen title -->
        <meta name="apple-mobile-web-app-title" content="Ally Bank">

        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta http-equiv="cleartype" content="on">

        <!-- Support theme-color for Android (>= v5.0) Chrome -->
        <meta name="theme-color" content="#650360">
    */
    meta = document.createElement('meta');
    meta.name = "mobile-web-app-capable"; meta.content = "yes"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "apple-mobile-web-app-capable"; meta.content = "yes"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "apple-mobile-web-app-status-bar-style"; meta.content = "black"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "apple-mobile-web-app-title"; meta.content = "Ally Bank"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "HandheldFriendly"; meta.content = "True"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "MobileOptimized"; meta.content = "320"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.httpEquiv = "cleartype"; meta.content = "on"; fragment.appendChild(meta);

    meta = document.createElement('meta');
    meta.name = "theme-color"; meta.content = "#650360"; fragment.appendChild(meta);

    document.getElementsByTagName('head')[0].appendChild(fragment);
  } else {

    // set viewport for desktop
    meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=1152, user-scalable=0, target-densitydpi=device-dpi";
    fragment.appendChild(meta);
    document.getElementsByTagName('head')[0].appendChild(fragment);
  }

})();

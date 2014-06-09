var loadSocial = function(){
  // FB
  loadFacebook(document, 'script', 'facebook-jssdk');

  loadTwitter();
};

var smileBlink = function() {
  $('.ico-smiley')
    .removeClass('ico-smiley')
    .addClass('ico-wink');
};

var loadFacebook = function(d, s, id) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '479584285400462',
      xfbml      : true,
      version    : 'v2.0'
    });
    FB.Event.subscribe('edge.create', smileBlink);
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
};

var loadTwitter = function(){
  window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
  }(document, "script", "twitter-wjs"));

  twttr.ready(function (twttr) {
    twttr.events.bind('click', smileBlink);
  });
}

window.onload = loadSocial;
var loadSocial = function(){
  // FB
  loadFacebook(document, 'script', 'facebook-jssdk');

  loadTwitter(document, 'script', 'twitter-wjs');
};

var loadFacebook = function(d, s, id) {
  var js, 
      fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) return;

  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=479584285400462";
  fjs.parentNode.insertBefore(js, fjs);

};

var loadTwitter = function(d,s,id){
  var js,
      fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location)?'http':'https';

  if (!d.getElementById(id)){
    js = d.createElement(s);
    js.id = id;
    js.src = p+'://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  }

};

window.onload = loadSocial;
$(document).ready(function(){

  adsbygoogle = window.adsbygoogle || [];

  var _browserSize = $(window).width(),
      ads = {},
      $header = $('#header-ad'),
      $middlePost = $('#middle-posts-ad'),
      $footerPost = $('#footer-post-ad');

  ads.fillDesktopAds = function(){
    ads.renderElem('ca-pub-1601752090500951', '8329748429', $middlePost, 'ad-970');
    ads.renderElem('ca-pub-1601752090500951', '6713414425', $footerPost, 'ad-970');
    ads.renderElem('ca-pub-1601752090500951', '7278490821', $header, 'ad-header');
  };

  ads.fillTabletAds = function(){
    ads.renderElem('ca-pub-1601752090500951', '2283214825', $middlePost, 'ad-728');
    ads.renderElem('ca-pub-1601752090500951', '8190147626', $footerPost, 'ad-728');
  };

  ads.fillMobileAds = function(){
    ads.renderElem('ca-pub-1601752090500951', '3759948022', $middlePost, 'ad-320');
    ads.renderElem('ca-pub-1601752090500951', '9666880822', $footerPost, 'ad-320');
  };

  ads.renderElem = function(adClient, adSlot, elem, elemClass) {
    if (elem.length) {
      elem.data('ad-client', adClient).data('ad-slot' , adSlot)
        .addClass(elemClass);
      adsbygoogle.push({});
    }
  };

  if (_browserSize > 900) {
    ads.fillDesktopAds();
  } else if (_browserSize > 480) {
    ads.fillTabletAds();
  } else {
    ads.fillMobileAds();
  }
});
$(document).ready(function(){

  adsbygoogle = window.adsbygoogle || [];

  var _browserSize = $(window).width(),
      ads = {},
      $sidePost = $('#side-post-ad'),
      $middlePost = $('#middle-posts-ad'),
      $footerPost = $('#footer-post-ad');

  ads.fillDesktopAds = function(){
    ads.renderElem('ca-pub-1601752090500951', '8329748429', $middlePost, 'ad-970');
    ads.renderElem('ca-pub-1601752090500951', '6713414425', $footerPost, 'ad-970');
  };

  ads.renderElem = function(adClient, adSlot, elem, elemClass) {
    if (elem.length) {
      elem.data('ad-client', adClient).data('ad-slot' , adSlot);
      if (elemClass){
        elem.addClass(elemClass);
      }
      adsbygoogle.push({});
    }
  };

  ads.sidePostFixedAd = function() {
    ads.renderElem('ca-pub-1601752090500951', '5236681221', $sidePost);

    $sidePost.addClass('ad-side-post');

    var $postItem = $('.post-item'),
        _offsetAd = $sidePost.offset(),
        _offsetPost = $postItem.offset(),
        _adMgt = 20;

    $(window).scroll(function(){
      if ($(window).scrollTop() < _offsetPost.top - _adMgt) {
        $sidePost.addClass('ad-side-post').removeClass('ad-fixed-side-post ad-abs-bottom-side-post');
      } else if ($(window).scrollTop() < (_offsetPost.top + $postItem.height() - ($sidePost.height() + _adMgt))) {
        $sidePost.addClass('ad-fixed-side-post').removeClass('ad-side-post ad-abs-bottom-side-post');
        $sidePost.css({
          'left' : _offsetAd.left,
          'top' : 20
        });
      } else {
        $sidePost.addClass('ad-abs-bottom-side-post').removeClass('ad-side-post ad-fixed-side-post');
      }
    });
  };

  if (_browserSize > 1270) { 
    if ($sidePost.length) {
      ads.sidePostFixedAd();
    };
    ads.fillDesktopAds();
  } else if (_browserSize > 900) {
    ads.fillDesktopAds();
  }
});
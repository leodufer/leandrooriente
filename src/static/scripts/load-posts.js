var isLoading = false,
    fullLoad = false;
    page = 1;

var checkScrollPos = function (){
  console.log('Load posts');
  var pageHeight = document.body.clientHeight;

  window.onscroll = function (event) {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if (pageHeight - top < 1500) {
      if (!isLoading && !fullLoad) {
        loadPosts();      
      }
    }
  }
};

var loadPosts = function(){
  isLoading = true;

  $.get("/page" + ++page + "/", function(response){
    var $posts = $(response).find('#posts');
    $('#more-posts').append($posts)

    isLoading = false;
    if (page >= TOTAL_PAGES) {
      fullLoad = true;
    }
  })
};

window.onload = checkScrollPos();
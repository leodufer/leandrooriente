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

  function reqListener (response) {
    if (this.status == 200) {
      var doc = (new DOMParser).parseFromString(this.responseText, 'text/html'),
          posts = doc.getElementById('posts'),
          pagePosts = document.getElementById('more-posts');
      
      console.log(posts);

      pagePosts.appendChild(posts);
      isLoading = false;
    };

    if (page >= TOTAL_PAGES) {
      fullLoad = true;
    }

  }

  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("get", "/page" + ++page + "/", true);
  oReq.send();
};

window.onload = checkScrollPos();
window.vtex = window.vtex || {};

window.vtex.topbar = function() {

  var _self = this,
      _resources = 'http://leandrooriente.com/',
      _endpoint = 'http://leandrooriente.com/',
      _authCookie = "VtexIdclientAutCookie";

  var $templateContainer;


  // ACTIONS

  _self.start = function() {
    $('head')
        .append('<link rel="stylesheet" href="' + _resources + 'styles/main.css' + '" type="text/css" />');

    $.when(
      $.getJSON( _endpoint + 'mocks/account.json?jsoncallback=true', {
        cookie: "teste"
      }),
      $.getScript( _resources + 'scripts/templates.min.js' )
      // $.Deferred(function( deferred ){
      //     $( deferred.resolve );
      // })
    ).done(function(requestData){
      _self.renderBaseTopbar();
      _self.renderUserNav(requestData[0].profile);
      _self.renderAppNav(requestData[0].appList);
      _self.renderAccNav(requestData[0].accList);

      _self.addHtmlListeners();
    });
  };

  _self.getAuthCookie = function(cookie) {
    var cookie;
    return cookie;
  };

  _self.renderBaseTopbar = function() {
    $('body').prepend(vtex.topbar.templates.container);
    $templateContainer = $('#topbar-template-container');
  };

  _self.renderUserNav = function(data) {
    var $usernav = $(vtex.topbar.templates.usernav);
    $usernav.find('#topbar-user-name').text(data.name);
    $usernav.find('#topbar-user-pic').attr('src', data.picture);
    $templateContainer.append($usernav);
  };

  _self.renderAccNav = function(data) {
    var $accNav = $(vtex.topbar.templates.accnav);
    $templateContainer.append(vtex.topbar.templates.accnav);
  };

  _self.renderAppNav = function(data) {
    var $appList = "",
        $appNav = $(vtex.topbar.templates.appnav);

    for (var i = 0; i < data.length; i++) {
      var _nav = "";

      _nav += '<li><a href="' + data[i].url + '" class="topbar-app-url">';
      _nav += '<span class="topbar-app-logo ' + data[i].id + '"></span>';
      _nav += '<div class="topbar-app-description">';
      _nav += '  <h3 class="topbar-acc-name">' + data[i].name + '</h3>';
      _nav += '  <p class="topbar-acc-resume">' + data[i].description + '</p>'
      _nav += '</div>';
      _nav += '</a></li>';

      $appList += _nav;
    };
    $appList = $($appList);
    $appNav.find('#topbar-app-list').html($appList);
    $templateContainer.append($appNav);
  };

  _self.addHtmlListeners = function() {

    var $base = $('#topbar-vtex'),
        $body = $('body'),
        $document = $(document),
        timerActiveNav,
        timerDisableNav;

    var activeNav = function(element) {
      $('.topbar-nav').removeClass('topbar-nav-active');
      $(element).toggleClass('topbar-nav-active');
    };

    console.log('Add html listeners');

    $document.on('click', function(){
      $('.topbar-nav').removeClass('topbar-nav-active');
    });

    $base.on('mouseenter', '.topbar-nav', function(e){
      console.log('Mouse Enter');
      var __this = this;
      if ($(__this).hasClass('topbar-nav-active')) {
        window.clearTimeout(timerDisableNav);
      } else {
        timerActiveNav = window.setTimeout(function(){
          activeNav(__this);
        }, 400);  
      };
    });

    $base.on('mouseleave', '.topbar-nav', function(e){
      console.log('Mouse Leave');
      var __this = this;
      if ($(__this).hasClass('topbar-nav-active')) {
        timerDisableNav =  window.setTimeout(function(){
          $(__this).removeClass('topbar-nav-active');
        }, 400);  
      } else {
        window.clearTimeout(timerActiveNav);
      }
    });

    $base.on('click', '.topbar-nav', function(e){
      activeNav(this);

      e.stopPropagation();
    });

    $base.on('click', '.topbar-dropdown', function(e){
      e.stopPropagation();
    });

  };

  return {
    start : _self.start
  }

}();

window.vtex.topbar.templates = {};

window.vtex.topbar.utils = {
  
};


window.vtex.topbar.start();

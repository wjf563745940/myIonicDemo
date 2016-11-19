// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app=angular.module('myapp', ['ionic', 'starter.controllers', 'starter.services','ngCordova','oc.lazyLoad']);

app.run(function($ionicPlatform,$rootScope,$state,f,locals,SocketService,MessageBroadServices) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     var needLoginView = f.f;//需要登录的页面state
     $rootScope.$on('$stateChangeStart',function(event,toStart,toParams,fromState,fromParams,options){ 
       if(needLoginView.indexOf(toStart.name)>=0 && !$rootScope.isLogin){ 
    //      $scope.$on('$ionicView.enter', function () {
    //     // 显示 tabs
    //    console.log($scope)
    // })
    if(locals.isEmptyObj(locals.getObject("user"))){
        $state.go("login",{redirect:'tab.personal'});//跳转到登录页
        event.preventDefault(); //阻止默认事件，即原本页面的加载
  }     
       } 
     })
     //
     var cbs={
      "newFun":cb,
      "messageBroad":messageBroadcb
     }
     SocketService.init(cbs);
     function cb(){ 
      if(true){
       $state.go("guide");
     }
     }
     function messageBroadcb(msg){ 
      MessageBroadServices.setmsg({"msg":msg,"isread":false})
     }

  });
}).value('loginuser',{"id":1}).value("f",{"f":["tab.personal"]})



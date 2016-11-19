app.config(function($stateProvider, $urlRouterProvider,$controllerProvider,$ionicConfigProvider) {
    /***init real**/
        $ionicConfigProvider.platform.ios.tabs.style('standard'); 
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');   
 /***init real**/
  app.registerController = $controllerProvider.register;//
  app.loadControllerJs=function(controllerJs){ 
      return function($rootScope,$q){ 
        var def=$q.defer(),deps=[];
        angular.isArray(controllerJs)?(deps=controllerJs):deps.push(controllerJs);
        require(deps,function(){
          $rootScope.$apply(function(){ 
            def.resolve();
          })

        });
        return def.promise;
      }
  }
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
     abstract: true,
    views:{
      'main':{
        templateUrl: 'templates/tabs.html'
      }
    }
    
  })
    .state('guide',{
      url:'/guide',
      views:{
        'main':{
          templateUrl:'templates/public/guidePage.html'
        }
      }
    })
    .state('login',{ 
      url:'/login',
      params:{redirect:null},
      views:{ 
        'main':{ 
          templateUrl:'templates/public/login.html'
        }
      }
    })
    .state('register',{
      url:'/register',
      views:{
        'main':{
          templateUrl:'templates/public/register.html'
        }
      }
    })
    .state('test',{ 
      url:'/test',
      views:{ 
        'main':{
           templateUrl: 'templates/tab-proDetial2.html'
        }
      }
    })
    .state('notab',{ 
      url:'/notab',
       abstract: true,
      templateUrl:'templates/no-tab.html'
    })

  // Each tab has its own nav history stack:

  .state('tab.index', {
    url: '/index',
    views: {
      'tab-index': {
        templateUrl: 'templates/index/tab-index.html',
        controller: 'IndexCtrl'
      }

    },
    resolve:{ 
       loadMyCtrl:["$ocLazyLoad",function($ocLazyLoad){
         return $ocLazyLoad.load("js/controllers/indexCtrl.js")
       }]
    }
  })
  .state('addQuestion',{
    url:'/addQuestion',
    params:{id:null},
    // views:{ 
    //   'tab-index':{ 
    //     templateUrl:'templates/index/tab-indexAddQuestion.html'
    //   }

    // }
     views:{ 
        'main':{
           templateUrl: 'templates/public/addquestion.html'
        }
      }
    

  })
  .state("questionTab",{ 
    url:'/questionTab',
    params:{
      id:null
    },
    views:{ 
      'main':{
        templateUrl:"templates/public/questionTab.html"
      }

    }
  })
.state('tab.indexHotProDetial', {
    url: '/proDetial:ids',
    params: {
        ida: null
    },
    views: {
      'tab-index': {
        templateUrl: 'templates/index/tab-proDetial.html'
      }
    }
  })
.state('tab.HotNewDetial',{
url:'/newsDetial:ids',
params:{
  ida:null
},
views:{
  'tab-index':{
    templateUrl:'templates/index/tab-newsDetial.html'
  }
}

})
.state('indexHotProDetial2', {
    url: '/proDetial2',
    // views: {
    //   'tab-index': {
        templateUrl: 'templates/index/tab-proDetial2.html'
    //   }
    // }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats/chats.html',
          controller: 'ChatsCtrl'
        }
      },
        resolve:{ 
       loadMyCtrl:["$ocLazyLoad",function($ocLazyLoad){
         return $ocLazyLoad.load("js/controllers/chatsCtrl.js")
       }]
    }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats/chatsDetail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state("tab.friends",{ 
      url:'/friends',
      views:{ 
        'tab-chats':{ 
          templateUrl:'templates/chats/friends.html'
        }
      }
    })

  .state('tab.community', {
    url: '/community',
    views: {
      'tab-community': {
        templateUrl: 'templates/community/index.html',
        controller: 'CommunityCtrl'
      }
    },
    resolve:{
      loadMyCtrl:["$ocLazyLoad",function($ocLazyLoad){
        return $ocLazyLoad.load("js/controllers/communityCtrl.js")
      }]
    }
  })
  .state('communityDetial', {
    url: '/community/detial/:cmmId',
    views: {
       'main': {
        templateUrl: 'templates/public/communityDetial.html'
      }
      
    }
  })
  .state('tab.community.hot', {
    url: '/community/hot',
    views: {
      'tab-community': {
        templateUrl: 'templates/community/hot.html',
        controller: 'CommunityCtrl'
      }
    }
  })
  .state('tab.personal',{ 
    url:'/personal',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personal.html'
      }
    },
    resolve:["$ocLazyLoad",function($ocLazyLoad){
      return $ocLazyLoad.load("js/controllers/personalCtrl.js");
    }]
  })
  .state('tab.personalEdit',{ 
    // cache: false,
    url:'persoanl/edit',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/editPersonal.html'
      }
    }
  })
  .state("tab.messageBroad",{ 
  	url:'personal/messageBroad',
  	views:{ 
  		'tab-personal':{
  			templateUrl:"templates/personal/messageBroad.html"
  		}
  	}
  })
  .state("tab.personalEditSave",{

    url:'personal/save',
    params:{ 
      value:null,
      key:null
    },
    views:{ 
      'tab-personal':{ 
          templateUrl:"templates/personal/editPersonalSave.html"
      }
    }
  })
  .state('tab.quotes',{ 
    url:'/personal/quotes',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/quotes.html',
        controller:'QuotesCtrl'
      
      },
        resolve:{ 
          
          //deps:app.loadControllerJs('../personal/quotesController')
        }
    }
  })
  .state('tab.personalpro',{ 
    url:'/personal/pro',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/personPro.html'
      }
    }
  })
  .state('tab.personalDetial',{ 
    url:'/personal/detial',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalDetial.html'
      }
    }
  })
.state('tab.personalSettings',{ 
    url:'/personal/settings',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalSettings.html'
      }
    }
  })
.state('tab.personalNewMsg',{ 
    url:'/personal/newmsg',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalNewMsg.html'
      }
    }
  })
.state('tab.dynamics',{ 
  cache: false,
  url:'/dynamics/index',
  views:{ 
    'tab-dynamics':{ 
      templateUrl:'templates/dynamics/index.html',
      controller:'DynamicsCtrl'
    }
  },
  resolve:["$ocLazyLoad",function($ocLazyLoad){
    return $ocLazyLoad.load("js/controllers/dynamicsCtrl.js")
  }]
})
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/index');

})

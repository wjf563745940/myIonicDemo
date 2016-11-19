/////require layzload
// define(['apprequire'], function (app) {
//   'use strict';
// var app=angular.module('starter');
// var ctrl=function($scope){
  
//   $scope.personalIndex={ id:1,
//     name:'啊 锋',
//     img:'img/max.png'
//   }   ;
//   $scope.myPro=[{ id:1,name:'我的投资项目',icon:'ion-social-usd-outline'},
//     { id:2,name:'我发起项目',icon:'ion-ios-paper-outline'},
//     { id:3,name:'我的约趟记录',icon:'ion-ios-paper-outline'},
//     { id:4,name:'我的领头记录',icon:'ion-ios-paper-outline'}
//   ];
//   $scope.mySetting={ 
//     id:1,
//     name:'设置',
//     icon:'ion-gear-a'
//   }
// }
//   ctrl.$inject = ['$scope'];
//   //return ctrl;
//   app.registerController('PersonalCtrl',ctrl);
// })

angular.module("starter.controllers",[])
.controller('PersonalCtrl',function($scope,locals,User,$state,SocketService){
  var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId)

  $scope.myPro=[{ id:1,name:'我的投资项目',icon:'ion-social-usd-outline'},
    { id:2,name:'我发起项目',icon:'ion-shuffle'},
    { id:3,name:'我的约谈记录',icon:'ion-chatbubble-working'},
    { id:4,name:'我的领头记录',icon:'ion-paper-airplane'}
  ];
  $scope.mySetting={ 
    id:1,
    name:'设置',
    icon:'ion-gear-a'
  }
  $scope.countshow=false;
  $scope.count=0;
  $scope.msg=function(){ 
    $state.go("tab.messageBroad")
  }
  var cbs={"msgb":msgb } 
SocketService.msgb(cbs);

function msgb(msg){
  console.log(msg)
$scope.count=$scope.count+1;
  $scope.countshow=true;
  $scope.$evalAsync();
}
})
.controller('PersonalProCtrl',function(){ 

})
.controller('PersonalEditCtrl',function($scope,User,locals){ 
 var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId);
   $scope.rapidResponse={}
     $scope.rapidResponse.update = function() {
             $scope.rapidResponse.a ="aaaaa"
             $scope.personalIndex=User.getById(userId);
             console.log( $scope.personalIndex)
         };                               //获取回复
   
    $scope.rapidResponse.update();         //函数调用
 
   $scope.$on('$stateChangeSuccess', $scope.rapidResponse.update); //如果有变化即重新调用获取回复的函数，实现了刷新
})
.controller("PersonalSaveCtrl",function($scope,$stateParams,locals,$state,$ionicHistory,User){ 
var userId=locals.getObject("user").id;
$scope.name=$stateParams.value;
$scope.save=function(){
  User.setById(userId,$stateParams.key,$scope.name);
   $scope.personalIndex=User.getById(userId);
             console.log( $scope.personalIndex)
$ionicHistory.goBack(-1)
}
})
.controller('PersonalDetialCtrl',function($scope,User,locals,$state,$ionicModal){
    var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId)
  $scope.myPro=[{ id:1,name:'我的提问',icon:'ion-ios-help-outline'},
    { id:2,name:'我的回答',icon:'ion-ios-information-outline'}
  ];
  $scope.myState={ 
    id:1,
    name:'全部动态',
    icon:'ion-ios-pulse'
  }
  $scope.editMyself=function(){ 
      $state.go('tab.personalEdit');
  }
   $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
})
.controller('PersonalSettingsCtrl',function($scope,locals,$state){
  $scope.myPro=[{ id:1,name:'手机号绑定',icon:'ion-social-usd-outline',data:'',url:'',action:"clearCach()"},
    { id:2,name:'新消息通知',icon:'ion-ios-paper-outline',data:'',url:'#/tab/personal/newmsg',action:"clearCach()"},
    { id:3,name:'清楚图片缓存',icon:'ion-ios-paper-outline',data:'309KB',url:'',action:"clearCach()"},
    { id:4,name:'清楚缓存',icon:'ion-ios-paper-outline',url:'',data:locals.getSize(),action:"clearCach()"},
  ];
   $scope.myPro2=[{ id:1,name:'帮助反馈',icon:'ion-social-usd-outline',data:''},
    { id:2,name:'关于我们',icon:'ion-ios-paper-outline',data:''}
  ];
  $scope.clearCach=function(){ 
   locals.clear();
    $scope.myPro[3].data=locals.getSize();
  }
  $scope.loginOut=function(){ 
    locals.clearByKey("user");
    $state.go("login");
  }
})
.controller('PersonalNewMsgCtrl',function($scope){

  $scope.myPro=[{ id:1,name:'接受新消息提示',content:'',icon:'ion-social-usd-outline',data:'',url:''},
    { id:2,name:'消息通知详情',content:'关闭后再收到消息通知将不显示发信人和内容摘要',icon:'ion-ios-paper-outline',data:'',url:'#/tab/personal/newmsg'}
  ];
   $scope.myPro2=[{ id:1,name:'声音',icon:'ion-social-usd-outline',data:''},
    { id:2,name:'振动',icon:'ion-ios-paper-outline',data:''}
  ];
})
.controller("QuotesCtrl",function($scope,$ionicPopup,$ionicLoading,QuotesService,LocalStorageService){
  $scope.symbols = LocalStorageService.get('quotes', ['YHOO', 'AAPL', 'GOOG', 'MSFT', 'FB', 'TWTR']);
  //   $scope.form = { 搜索条件不要了
  //   query: ''
  // };
//    $scope.state = {
//         reorder: false
//       };
//     function updateSymbols() {
//         var symbols = [];
//         angular.forEach($scope.quotes, function(stock) {
//           symbols.push(stock.Symbol);
//         });
//         $scope.symbols = symbols;
//         LocalStorageService.update('quotes', symbols);
//       }//
//重新排序不要了
// $scope.reorder = function(stock, $fromIndex, $toIndex) {
//     $scope.quotes.splice($fromIndex, 1);
//     $scope.quotes.splice($toIndex, 0, stock);
//     updateSymbols();
//   };
   $scope.getQuotes = function() {
        QuotesService.get($scope.symbols).then(function(quotes) {
          $scope.quotes = quotes;
        }, function(error) {
          $ionicPopup.alert({
            template: 'Could not load quotes right now. Please try again later.'
          });
        }).finally(function() {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
      //像列表添加。。不要了
    //     $scope.add = function() {
    // if ($scope.form.query) {
    //       QuotesService.get([$scope.form.query]).then(function(results) {
    //         if (results[0].Name) {
    //           $scope.symbols.push($scope.form.query);
    //           $scope.quotes.push(results[0]);
    //           $scope.form.query = '';
    //           updateSymbols();
    //         } else {
    //           $ionicPopup.alert({
    //             title: 'Could not locate symbol.'
    //           });
    //         }
    //       });
    //     }
    //   };
    //像列表删除。。。不要了
      // $scope.remove = function($index) {
      //   $scope.symbols.splice($index, 1);
      //   $scope.quotes.splice($index, 1);
      //   updateSymbols();
      // };
    //样式区别不要了
  //      $scope.quoteClass = function(quote) {
  //   if (quote.PreviousClose < quote.LastTradePriceOnly) {
  //     return 'positive';
  //   }
  //   if (quote.PreviousClose > quote.LastTradePriceOnly) {
  //     return 'negative';
  //   }
  //   return '';
  // };
      $ionicLoading.show();
      $scope.getQuotes();


})
.controller("MsgsCtrl",function($scope){


})
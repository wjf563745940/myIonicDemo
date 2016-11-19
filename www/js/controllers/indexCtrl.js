angular.module('starter.controllers', [])
.controller('IndexCtrl',function($scope,Lbs,HotNews,HotPros,HotActives,$rootScope,$ionicActionSheet,$timeout,$state,$ionicPopover){ 
  $scope.logo="./img/logo_v2.png"
  $scope.myActiveSlide =1;
  $scope.lbs = Lbs.all();
  $scope.news=HotNews.all();
  $scope.pros=HotPros.all();
 $scope.acts=HotActives.all();
  $scope.$on('$ionicView.enter', function () {
        // 显示 tabs
        $rootScope.hideTabs = false;
    })
   // .fromTemplateUrl() 方法
  $ionicPopover.fromTemplateUrl('templates/public/my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.showPopu=function($event){ 
$scope.popover.show($event);
  }
  $scope.addQuestion=function(){ 
       var hideSheet = $ionicActionSheet.show({
                      buttons: [{ text: '<a >发起提问</a> ' },],
                      cancelText: '取消',
                      cancel: function() {
                         },
                      buttonClicked: function(index) {
                        $state.go("tab.addQuestion");
                        return true;
                      }
                  });
                  $timeout(function() {
                      hideSheet();
                  }, 2000);
  }
})
.controller('AddQuestionCtrl',function($scope,$stateParams,$ionicHistory,$ionicViewSwitcher,$cordovaImagePicker){
$scope.mytitle="";
$scope.mycontent="" ;
$scope.addPhoto=function(){ 
if (!window.imagePicker) {
      alert('目前您的环境不支持相册上传。')
      return;
    }
    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options).then(function(results) {
      var uri = results[0],
        name = uri;
      if (name.indexOf('/')) {
        var i = name.lastIndexOf('/');
        name = name.substring(i + 1);
      }

      // 获取UPYUN的token数据
      Upyun.token(name, 1000).then(function(resp) {
        localStorage.setItem('STREAM_UPLOAD_UPYUN', JSON.stringify(resp.data));
        $scope.uploadimage(uri, prop);
      }).finally(function() {
      });
    }, function(error) {
      alert(error);
    });
}

})
.controller("NewsDetailCtrl",function($scope,NewDetial,$stateParams,HotNews){
$scope.newsDetail=NewDetial.getById($stateParams.ida); 
$scope.hotNews=HotNews.getById($scope.newsDetail.hotnewId);
        $scope.isFocus = false;        
        $scope.getFocus=function(){ 
             $scope.isFocus = true; 
        }
         $scope.setBlur=function(){ 
            $scope.isFocus = false; 
        }
})
.controller('ProDetialCtrl',function($scope,HotPros,$stateParams,$ionicScrollDelegate){ 
   $scope.pro=HotPros.getById($stateParams.ida);
   $scope.mtTabShow=true;
   $scope.showIntro=true;
   $scope.showRule=false;
   $scope.intisActive=true;
   $scope.ruleisActive=false;
   $scope.showItem=function(id){ 
      if(id==1){ 
    $scope.showIntro=true;
   $scope.showRule=false;
   $scope.intisActive=true;
   $scope.ruleisActive=false;
 }else if(id==2){
   $scope.showIntro=false;
   $scope.showRule=true;
   $scope.intisActive=false;
   $scope.ruleisActive=true;
 }
   }
   $scope.test=function(){ 
   if($scope.mtTabShow && $ionicScrollDelegate.getScrollPosition().top>200){ 
       $scope.mtTabShow=false;
         $scope.$evalAsync();
   } 
   if(!$scope.mtTabShow && $ionicScrollDelegate.getScrollPosition().top <= 180){ 

      $scope.mtTabShow=true;
        $scope.$evalAsync();
   }
   }
})
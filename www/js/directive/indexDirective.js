angular.module("myapp")
.directive('setFocus',['$timeout', function($timeout){
         return {
             scope:false,
             link:function(scope, element){                     
                 scope.$watch("isFocus",function(newValue,oldValue, scope) {
                     if(newValue){
                      $timeout(function() {
                 element[0].focus();
            },300);  
                     }
                }, true);
             }
         };
    }])
.directive('myScroll',function(){
  function link($scope, element, attrs) { 
    var $domScroll=$(element[0]);
    var startX=0,startY=0;
    $domScroll.on("touchstart",function(e){
      startX=e.originalEvent.changedTouches[0].pageX;
      startY=e.originalEvent.changedTouches[0].pageY;
      console.log("start:("+startX+","+startY+")"+"--"+$(this).scrollTop());
    });
    $domScroll.on("touchmove",function(e){
      var x = e.originalEvent.changedTouches[0].pageX-startX;
      var y = e.originalEvent.changedTouches[0].pageY-startY;
      if ( Math.abs(x) > Math.abs(y)) {//左右滑动 
       scrollLeft($(this),x);  
      }else if( Math.abs(y) > Math.abs(x)){ //上下滑动
        scrollTop($(this),y);  
      }
      function scrollLeft(obj,x){ 
        var currentScroll = obj.scrollLeft();
        console.log(parseInt(currentScroll)-x);
        obj.scrollLeft(parseInt(currentScroll)-x);//滑动的距离
        e.preventDefault(); 
        e.stopPropagation();
      }
      function scrollTop(obj,y){ 
        var currentScroll = obj.scrollTop();
        console.log(parseInt(currentScroll)-y);
        obj.scrollTop(parseInt(currentScroll)-y);//滑动的距离
        e.preventDefault(); 
        e.stopPropagation();
      }
    });
  } 
  return {
    restrict: 'A',
    link: link 
  };
})
.directive('hideTabs', function($rootScope) {//隐藏tabs指令
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})
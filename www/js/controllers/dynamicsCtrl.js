angular.module("starter.controllers",[])
.controller('DynamicsCtrl',function( $state,loginuser,$scope,$ionicNavBarDelegate,$ionicHistory,$ionicViewSwitcher,$ionicActionSheet,Dynameics,$ionicHistory){
   $scope.myHref=function(item){ 
    $ionicViewSwitcher.nextDirection('forward');
                $state.go('communityDetial', {'cmmId':item.issueID});
 } 
  $scope.items=Dynameics.getByUserId(loginuser.id);
  if( $scope.items && $scope.items.length>0){ 
   $scope.muhide=true;
  }
})
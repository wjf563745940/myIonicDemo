angular.module("starter.controllers",[])
.controller('CommunityCtrl',function($scope,MyCommunity,Issues,User,$ionicViewSwitcher){
 $scope.myHref=function(item){ 
    $ionicViewSwitcher.nextDirection('forward');
                $state.go('communityDetial', {'cmmId':item});
 } 
$scope.myCommunity=MyCommunity.all();
var width=$scope.myCommunity.length*40+"%";
if(document.getElementById("my-community")){
document.getElementById("my-community").style.width=width;
}else{ 
}
$scope.pros=Issues.getByType(1);
for(var i=0;i<$scope.pros.length;i++){ 
  $scope.pros[i]['user']=User.getById($scope.pros[i].questionerId)
}
$scope.go=function(id){
var  active=MyCommunity.getByActive();
  if(id==active.id){}else{
    active.active="noactive";
    MyCommunity.getById(id).active="active";
$scope.pros=Issues.getByType(id);
for(var i=0;i<$scope.pros.length;i++){ 
  $scope.pros[i]['user']=User.getById($scope.pros[i].questionerId)
}
  }
}
  })
  .controller('CommunityDetialCtrl',function($scope,Issues,User,$stateParams){ 
 $scope.disabled=false;
 $scope.textContent="关注";
$scope.btnColor="btn-green";
$scope.cmmId=$stateParams.cmmId ;
$scope.Issue=Issues.getById($scope.cmmId)  
console.log($scope.Issue)
$scope.questioner=User.getById($scope.Issue.questionerId);
$scope.sign=$scope.questioner.sign;
$scope.name=$scope.questioner.name;
$scope.tags=$scope.Issue.tags;
$scope.contents=[];
for(var i=0;i<$scope.Issue.content.length;i++){
  var obj =$scope.Issue.content[i];
  var user =User.getById(obj.userId)
obj['user']=user;
  $scope.contents.push(obj)
}
  $scope.gofollow=function(){ 
  $scope.Issue.follow+=1;
  $scope.follow=$scope.Issue.follow;
  $scope.disabled=true;
  $scope.textContent="已关注";
  $scope.btnColor="btn-gray";
}
})
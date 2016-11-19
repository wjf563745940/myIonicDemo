angular.module("starter.controller",[])
.controller('ChatsCtrl', function($scope,locals, Chats,$ionicListDelegate,$state,User,SocketService) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.goChat=function(chat){
    var user = User.getById(locals.getObject("user").id);
    var target=User.getById(chat.userId);
     SocketService.enter(user,target,chat.id);

  }
  $scope.gotop=function(chat){
    Chats.gotop(chat);
    $ionicListDelegate.closeOptionButtons();
  }
    // $scope.onItemDelete = function(item) {
    //   $scope.items.splice($scope.items.indexOf(item), 1);
    // };
})
.controller('ChatDetailCtrl', function($scope, $stateParams, SocketService,Chats,ChatsDetail,User,$ionicScrollDelegate,locals,loginuser) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.list=[];
  $scope.inputChat="";
  var myuser=User.getById(locals.getObject("user").id);
  var contents=ChatsDetail.getByUsersId(loginuser.id,$scope.chat.userId);//可以根据对话列表id查询
  var contentslocal2=locals.getObject(loginuser.id+""+$scope.chat.userId)
  var contentsId=ChatsDetail.getId(loginuser.id,$scope.chat.userId)
  for(var i=0;i<contentslocal2.length;i++){ 
    var cont=contentslocal2[i];
    var user=User.getById(cont.userId);
    cont['user']=user
    $scope.list.push(cont);
  }
  $scope.addChat=function(){
    var myDate = new Date();
    var cont={};
    cont.id=ChatsDetail.getIdByUsersId(contentsId);
    cont.content=$scope.inputChat;
    cont.time=myDate.getHours()+":"+myDate.getMinutes();
    cont.myself=true;
    cont.userId=1;
    ChatsDetail.addlist(contentsId,cont);

    //locals.setObject(loginuser.id,cont)
    //locals.updateObject("users",users);
    var contentslocal=ChatsDetail.getByUsersId(loginuser.id,$scope.chat.userId);
    locals.setObject(loginuser.id+""+$scope.chat.userId,contentslocal)
    cont['user']=myuser;
    $scope.list.push(cont);
    $scope.inputChat="";
    $ionicScrollDelegate.scrollBottom();
    //走服务器
     var user = User.getById(locals.getObject("user").id);
     var target=User.getById($scope.chat.userId);
      SocketService.submit(user,target,cont,$stateParams.chatId,callback)
      function callback(data){
        var myDate = new Date();
        var cont={};
        cont.id=ChatsDetail.getIdByUsersId(contentsId);
        cont.content="我是机器人啊";
        if(data.content.content.includes("sb")){
             cont.content="别骂人啊";
        }
        cont.time=myDate.getHours()+":"+myDate.getMinutes();
        cont.myself=false;
        cont.userId=1;
        ChatsDetail.addlist(contentsId,cont);
          var contentslocal=ChatsDetail.getByUsersId(loginuser.id,$scope.chat.userId);
    locals.setObject(loginuser.id+""+$scope.chat.userId,contentslocal)
    cont['user']=myuser;
    $scope.list.push(cont);
    $scope.inputChat="";
  
    $scope.$evalAsync();
      $ionicScrollDelegate.scrollBottom();
      }

  }
})
.controller("FriendsCtrl",function($scope,FriendService,FriendKeyService,$ionicScrollDelegate,$timeout){
$scope.data=FriendService.getKeyAll();
var delegate 
 $timeout(function(){delegate = $ionicScrollDelegate.$getByHandle('myScroll'); },500);

$scope.sel=function(event){ 
  console.log(event.target.innerText)
var tag=event.target.innerText;
var movetag=document.getElementById(tag);
if(movetag){ 
var top=document.getElementById(tag).offsetTop;

  delegate.scrollTo(0,top,true)
}
$scope.sw=function(event){ 
 console.log(event.target.innerText)
}

}

})
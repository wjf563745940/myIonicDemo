define(['apprequire'], function (app) {
  'use strict';
var app=angular.module('starter');
var ctrl=function($scope,$ionicNavBarDelegate,$ionicHistory){
  
  $scope.logo="./img/logo_v2.png";
       Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
}
  ctrl.$inject = ['$scope'];
  //return ctrl;
  app.registerController('navBarCtrl',ctrl);
})
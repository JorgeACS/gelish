var app = angular.module('uiLogin', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});
app.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {
    $scope.InicioSesion = function() {
      user={
        username: $scope.username,
        password:$scope.password
      };
      $http.post('/login',user).then((res) => {
        //console.log(res.data.nombre)
        
        if(res.data.tipo==0){

          $window.location.href ="/admin";
        }else if(res.data.tipo==1){
          $window.location.href ="/adminSuc";
        }else{
          $window.location.href ="/recepcionista";
        }
      })
    };
    
});

app.controller('user', function($scope, $http, $location,$window,$rootScope) {
    $scope.InicioSesion = function() {
      user={
        username: $scope.username,
        password:$scope.password
      };
      $http.post('/login',user).then((res) => {

        if(res.data.tipo==0){


          $window.location.href ="/admin";
        }else if(res.data.tipo==1){
          $window.location.href ="/adminSuc";
        }else{
          $window.location.href ="/recepcionista";
        }
      })
    };
});

 
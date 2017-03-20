var app = angular.module('uiLogin', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});
app.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {
    //array = [];
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
          $http.get('/sucursal',{params: { sucursal_id: res.data.sucursal_id }}).then((res) =>{
            console.log(":o")
            /*if(res2.data.caja_id == null){
              console.log("nay")
            }else{
              console.log("yay")
            }*/
          });
          $window.location.href ="/recepcionista";
          
          
        }

      })
    };
});

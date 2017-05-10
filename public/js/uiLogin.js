var loginApp = angular.module('uiLogin', ['ngRoute']);
loginApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});
loginApp.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {
    //array = [];
    $scope.InicioSesion = function() {
      var user={
        username: $scope.username,
        password:$scope.password
      };
      $scope.user = user;
      $http.post('/login',user).then((res) => {
        //$cookies.put('user', user);
        loginApp.value('sucursal_id',res.data.sucursal_id);
        if(res.data.tipo==0){
          $window.location.href ="/admin";
        }else if(res.data.tipo==1){
          $window.location.href ="/adminSuc";
        }else{
          /*
          $http.get('/sucursal',{params: { sucursal_id: res.data.sucursal_id }}).then((res) =>{
            console.log(res.data.caja_id)
            /*if(res2.data.caja_id == null){
              console.log("nay")
            }else{
              console.log("yay")
            }
          });
          */
          $window.location.href ="/recepcionista";
          
          
        }

      },(err) =>{
        alert("Nombre de usuario y contrase\u00f1a incorrectos.");
        $window.location.href = "/";
      })
    };
});


var cookieModule = angular.module('cookiesExample', ['ngCookies'])
.controller('CookieController', ['$cookies', function($cookies) {
  // Retrieving a cookie
  var favoriteCookie = $cookies.get('myFavorite');
  // Setting a cookie
  $cookies.put('myFavorite', 'oatmeal');
}]);
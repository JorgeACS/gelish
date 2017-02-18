var app = angular.module('admin', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/logout", {
      template: '',
      controller: function($window, $http) {
        $http.delete('/logout').then(function (res) {
          $window.location.href = '/'
        }).catch(function (res) {
          console.log('wtf', res);
        });
      }
    }).when("/agregarAdmin", {
      templateUrl: 'agregarAdmin',
      controller:function($scope,$location,$window, $http) {
        $scope.agregarAdmin = function() {
          user={
            sucursal_id:$scope.sucursal,
            username: $scope.username,
            password:$scope.password,
            nombre:$scope.nombre,
            apellido:$scope.apellido,
            correo:$scope.correo,
            telefono:$scope.tel,
            tipo:2,
          };
          console.log("hola");
          $http.post('/usuario',user).then((res) => {
            console.log(":)");
          })

        }
      }
    }).when("/editarAdmin", {
      templateUrl: 'editarAdmin'
    }).when("/eliminarAdmin", {
      templateUrl: 'eliminarAdmin'
    }).when("/agregarSucursal", {
      templateUrl: 'agregarSucursal'
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal'
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal'
    })
  $locationProvider.html5Mode(true);
});

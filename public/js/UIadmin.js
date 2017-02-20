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
      templateUrl: 'editarSucursal',
      $scope.sucursales = {
          sucursal01 : {nombre : "Sucursal HMO", direccion : "Av. Sin numero", telefono : "2-11-33-12"},
          sucursal02 : {nombre : "Sucursal Guaymas", direccion : "Av. Molino de Camu", telefono : "2-03-33-33"},
          sucursal03 : {nombre : "Sucursal Nogales", direccion : "Av. Rebeico", telefono : "2-02-03-04"}
        }
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal'
    })
  $locationProvider.html5Mode(true);
});

var app = angular.module('adminSuc', ['ngRoute']);
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
    }).when("/agregarProducto", {
      templateUrl: 'agregarProducto'
    }).when("/editarProducto", {
      templateUrl: 'editarProducto'
    }).when("/eliminarProducto", {
      templateUrl: 'eliminarProducto'
    }).when("/agregarServicio", {
      templateUrl: 'agregarServicio'
    }).when("/editarServicio", {
      templateUrl: 'editarServicio'
    }).when("/eliminarServicio", {
      templateUrl: 'eliminarServicio'
    }).when("/agregarRecepcionista", {
      templateUrl: 'agregarRecepcionista'
    }).when("/editarRecepcionista", {
      templateUrl: 'editarRecepcionista'
    }).when("/eliminarRecepcionista", {
      templateUrl: 'eliminarRecepcionista'
    }).when("/agregarTecnica", {
      templateUrl: 'agregarTecnica'
    }).when("/editarTecnica", {
      templateUrl: 'editarTecnica'
    }).when("/eliminarTecnica", {
      templateUrl: 'eliminarTecnica'
    })
  $locationProvider.html5Mode(true);
});

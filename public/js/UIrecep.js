var app = angular.module('recepcionista', ['ngRoute']);
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
    }).when("/agregarCliente", {
      templateUrl: 'AgregarCliente',
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
    }).when("/editarCliente", {
      templateUrl: 'editarCliente',
      controller:function($scope){
        $scope.listo =function(){
          console.log("yeahh");
        },
        $scope.clients = {
          cliente01 : {nombre : "Ana", apellido : "Noriega", direccion : "Av. Sin numero", correo : "ana@hotmail.com", telefono : "2-11-33-12"},
          cliente02 : {nombre : "Lucia", apellido : "Montoya", direccion : "Av. Molino de Camu", correo : "lucia@gmail.com", telefono : "2-12-00-21"},
          cliente03 : {nombre : "Erick", apellido : "Lopez F.", direccion : "Av. Rebeico", correo : "erick@hotmail.com", telefono : "2-10-53-67"}
        }
      }
    }).when("/eliminarCliente", {
      templateUrl: 'eliminarCliente'
    }).when("/crearNota", {
      templateUrl: 'crearNota',
      controller:function() {
        
      }
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal'
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal'
    })
  $locationProvider.html5Mode(true);
});

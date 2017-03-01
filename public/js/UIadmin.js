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
      templateUrl: 'editarAdmin',
      controller:function($scope){
        $scope.admins = {
            admin01 : {
              nombre : "Lourdes",
              apellido_paterno : "Archuleta",
              apellido_materno : "",
              telefono : "2-00-00-00",
              sucursal : "Cantabria"
             },
            admin02 : {
              nombre : "Dunia",
              apellido_paterno : "Morales",
              apellido_materno : "",
              telefono : "2-11-11-11",
              sucursal : "Dila"
            }
        }
      }
    }).when("/eliminarAdmin", {
      templateUrl: 'eliminarAdmin'
    }).when("/agregarSucursal", {
      templateUrl: 'agregarSucursal',
      controller:function($scope){
        $scope.admins = {
            admin01 : {
              nombre : "Lourdes",
              apellido_paterno : "Archuleta",
              apellido_materno : "",
              telefono : "2-00-00-00"
             },
            admin02 : {
              nombre : "Dunia",
              apellido_paterno : "Morales",
              apellido_materno : "",
              telefono : "2-11-11-11"
            }
        }
      }
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal',
      controller:function($scope){
        $scope.sucursales = {
            sucursal01 : {plaza : "Dila", ciudad : "Hermosillo", direccion : "Plaza Dila", telefono : "2-11-33-12",admin : "Dunia Morales"},
            sucursal02 : {plaza : "Cantabria",ciudad : "Hermosillo", direccion : "Cantabria", telefono : "2-03-33-33",admin : "Lourdes Archuleta"}
        }
        $scope.admins = {
            admin01 : {
              nombre : "Lourdes",
              apellido_paterno : "Archuleta",
              apellido_materno : "",
              telefono : "2-00-00-00"
             },
            admin02 : {
              nombre : "Dunia",
              apellido_paterno : "Morales",
              apellido_materno : "",
              telefono : "2-11-11-11"
            }
        }
      }
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal'
    }).when("/reportesSucursales", {
      templateUrl: 'reporteSucursales',
      controller:function($scope){
        angular.element(document).ready(function () {
          cargarGraficas();
        });
      }
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas'
    })

  $locationProvider.html5Mode(true);
});
//app.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {

//});

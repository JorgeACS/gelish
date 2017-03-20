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
//<<<<<<< HEAD
        /*$scope.loadScript = function(url, type, charset) {
            if (type===undefined) type = 'text/javascript';
            if (url) {
                var script = document.querySelector("script[src*='"+url+"']");
                if (!script) {
                    var heads = document.getElementsByTagName("head");
                    if (heads && heads.length) {
                        var head = heads[0];
                        if (head) {
                            script = document.createElement('script');
                            script.setAttribute('src', url);
                            script.setAttribute('type', type);
                            if (charset) script.setAttribute('charset', charset);
                            head.appendChild(script);
                        }
                    }
                }
                return script;
            }
        };
        $scope.loadScript('data/morris-data.js', 'text/javascript', 'utf-8');*/
//=======
        angular.element(document).ready(function () {
          cargarGraficas();
        });
//>>>>>>> f28de5ff8ea799eebc5890ff2d135567a4c91cf2
      }
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas'
    })

  $locationProvider.html5Mode(true);
});
//app.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {

//});

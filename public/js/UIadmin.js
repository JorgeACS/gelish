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
              nombre : "Jorge",
              apellido_paterno : "Carvajal",
              apellido_materno : "Siller",
              telefono : "2-11-33-12",
              sucursal : "Hermosillo"
             },
            admin02 : {
              nombre : "Juan",
              apellido_paterno : "Soto",
              apellido_materno : "Cruz",
              telefono : "2-03-33-33",
              sucursal : "Guaymas"
            },
            admin03 : {
              nombre : "Erick",
              apellido_paterno : "Lopez",
              apellido_materno : "Fimbres",
              telefono : "2-02-03-04",
              sucursal : "Nogales"
            }
        }
      }
    }).when("/eliminarAdmin", {
      templateUrl: 'eliminarAdmin'
    }).when("/agregarSucursal", {
      templateUrl: 'agregarSucursal'
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal',
      controller:function($scope){
        $scope.sucursales = {
            sucursal01 : {plaza : "Dila", ciudad : "Hermosillo", direccion : "Av. Sin numero", telefono : "2-11-33-12",admin : "Juan"},
            sucursal02 : {plaza : "Girasol",ciudad : "Guaymas", direccion : "Av. Molino de Camu", telefono : "2-03-33-33",admin : "Jorge"},
            sucursal03 : {plaza : "Tierra Nueva",ciudad : "Nogales", direccion : "Av. Rebeico", telefono : "2-02-03-04", admin : "Erick"}
        }
      }
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal'
    }).when("/reportesSucursales", {
      templateUrl: 'reporteSucursales',
      controller:function($scope){
        $scope.loadScript = function(url, type, charset) {
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
        $scope.loadScript('data/morris-data.js', 'text/javascript', 'utf-8');
      }
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas'
    })

  $locationProvider.html5Mode(true);
});
app.controller('myCtrl', function($scope, $http, $location,$window,$rootScope) {

});

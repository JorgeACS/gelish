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
      templateUrl: 'editarProducto',
      controller:function($scope){
        $scope.productos = {
          producto01 : {
            nombre : "Esmalte Rojo",
            descripcion : "Esmalte de color rojo",
            precio : "50",
            cantidad : "100"
           },
          producto02 : {
            nombre : "Esmalte Rosa",
            descripcion : "Esmalte de color rosa",
            precio : "60",
            cantidad : "40"
          },
          producto03 : {
            nombre : "Esmalte Morado",
            descripcion : "Esmalte de color morado",
            precio : "70",
            cantidad : "6"
          }
        }
      }
    }).when("/eliminarProducto", {
      templateUrl: 'eliminarProducto'
    }).when("/agregarServicio", {
      templateUrl: 'agregarServicio'
    }).when("/editarServicio", {
      templateUrl: 'editarServicio',
      controller:function($scope){
        $scope.servicios = {
          servicio01 : {
            nombre : "Manicure",
            descripcion : "Servicio de manicure",
            precio : "150"
           },
          servicio02 : {
            nombre : "Pedicure",
            descripcion : "Servicio de pedicure",
            precio : "200"
          },
          servicio03 : {
            nombre : "Gelish",
            descripcion : "Servicio de gelish",
            precio : "100"
          }
        }
      }
    }).when("/eliminarServicio", {
      templateUrl: 'eliminarServicio'
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas',
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
        $scope.loadScript('data/data-tecnicas.js', 'text/javascript', 'utf-8');
      }
    }).when("/agregarRecepcionista", {
      templateUrl: 'agregarRecepcionista'
    }).when("/editarRecepcionista", {
      templateUrl: 'editarRecepcionista',
      controller:function($scope){
        $scope.recepcionistas = {
            recepcionista01 : {
              nombre : "Jorge",
              apellido_paterno : "Carvajal",
              apellido_materno : "Siller",
              telefono : "2-11-33-12",
              sucursal : "Hermosillo"
             },
            recepcionista02 : {
              nombre : "Juan",
              apellido_paterno : "Soto",
              apellido_materno : "Cruz",
              telefono : "2-03-33-33",
              sucursal : "Guaymas"
            },
            recepcionista03 : {
              nombre : "Erick",
              apellido_paterno : "Lopez",
              apellido_materno : "Fimbres",
              telefono : "2-02-03-04",
              sucursal : "Nogales"
            }
        }
      }
    }).when("/eliminarRecepcionista", {
      templateUrl: 'eliminarRecepcionista'
    }).when("/agregarTecnica", {
      templateUrl: 'agregarTecnica'
    }).when("/editarTecnica", {
      templateUrl: 'editarTecnica',
      controller:function($scope){
        $scope.tecnicas = {
            tecnica01 : {
              nombre : "Jorge",
              apellido_paterno : "Carvajal",
              apellido_materno : "Siller",
              telefono : "2-11-33-12",
              sucursal : "Hermosillo"
             },
            tecnica02 : {
              nombre : "Juan",
              apellido_paterno : "Soto",
              apellido_materno : "Cruz",
              telefono : "2-03-33-33",
              sucursal : "Guaymas"
            },
            tecnica03 : {
              nombre : "Erick",
              apellido_paterno : "Lopez",
              apellido_materno : "Fimbres",
              telefono : "2-02-03-04",
              sucursal : "Nogales"
            }
        }
      }
    }).when("/eliminarTecnica", {
      templateUrl: 'eliminarTecnica'
    })
  $locationProvider.html5Mode(true);
});

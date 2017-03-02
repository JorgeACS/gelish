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
      controller:function($scope) {
        $scope.servicios = {
          servicio01 : {
            nombre : "Gelish Manos",
            descripcion : "",
            precio : "120"
           },
          servicio02 : {
            nombre : "U\u00f1as acrilicas",
            descripcion : "",
            precio : "260"
          },
          servicio03 : {
            nombre : "Manicura",
            descripcion : "",
            precio : "150"
          },
          servicio04 : {
            nombre : "Pedicura Spa",
            descripcion : "",
            precio : "300"
          },
          servicio05 : {
            nombre : "Pedicura Brasile\u00f1o",
            descripcion : "",
            precio : "200"
          }
        }
        $scope.productos = {
          producto01 : {
            nombre : "Foundation",
            descripcion : "15ml",
            precio : "490",
            cantidad : "100",
            categoria : "Gelish"
           },
          producto02 : {
            nombre : "Mascarilla humectante",
            descripcion : "250gr",
            precio : "350",
            cantidad : "40",
            categoria : "S2"
          },
          producto03 : {
            nombre : "Pestañas J .15 #10",
            descripcion : "Esmalte de color morado",
            precio : "250",
            cantidad : "6",
            categoria : "Jdenis"
          },
          producto04 : {
            nombre : "Top it off",
            descripcion : "15ml",
            precio : "315",
            cantidad : "20",
            categoria : "Gelish"
          },
          producto05 : {
            nombre : "Sheek White",
            descripcion : "15ml",
            precio : "250",
            cantidad : "70",
            categoria : "Gelish"
          }
        }
        $scope.clients = {
            cliente01 : {
              nombre : "Ana",apellido: "Noriega"
             },
            cliente02 : {
              nombre : "Fernanda",apellido : "Serrano"
            },
            cliente03 : {
              nombre : "Alex",apellido : "Torres"
            }
        }
        $scope.fecha=new Date();
        $scope.listaNota = [{id: 'choice1'}];
        $scope.addNewChoice = function() {
          var newItemNo = $scope.listaNota.length+1;
          $scope.listaNota.push({'id':'choice'+newItemNo});
        };
        $scope.removeChoice = function() {
          var lastItem = $scope.listaNota.length-1;
          $scope.listaNota.splice(lastItem);
        };
      }
    }).when("/abrirCaja", {
      templateUrl: '',
      controller:function($scope){
        console.log("jola")
        //var lista =  document.getElementById(notaVenta).style;
        //lista.display = 'block';
      }
    }).when("/interfazCaja",{
      templateUrl: 'interfazCaja',
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
        $scope.loadScript('js/caja.js', 'text/javascript', 'utf-8');
      }
  })
  $locationProvider.html5Mode(true);
});

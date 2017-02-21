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
          cliente01 : {nombre : "Aplicacion de uñas", costo : "100"},
          cliente02 : {nombre : "Aplicacion de mascarilla", costo : "150"},
          cliente03 : {nombre : "Masaje", costo : "200"}
        }
        $scope.productos = {
          cli01 : {nombre : "Lima", costo : "80"},
          cli02 : {nombre : "Tinte", costo : "100"},
          cli03 : {nombre : "Jabon", costo : "20"}
        }
        $scope.products = [];
        $scope.addItemP = function () {
          $scope.errortext = "";
          //if (!$scope.addMe) {return;}
              $scope.products.push($scope.selectProd.nombre);
        }
        $scope.removeItemP = function (x) {
            $scope.errortext = "";
            $scope.products.splice(x, 1);
        }
        $scope.serv = [];
        $scope.addItemS = function () {
          $scope.errortext = "";
          //if (!$scope.addMe) {return;}
              $scope.serv.push($scope.selectServ.nombre);
        }
        $scope.removeItemS = function (x) {
            $scope.errortext = "";
            $scope.serv.splice(x, 1);
        }
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

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
          },
          servicio01 : {
            nombre : "Gelish Manos",
            descripcion : "",
            precio : "120",
            tecnica:"Ana Lopez"
           },
          servicio02 : {
            nombre : "U\u00f1as acrilicas",
            descripcion : "",
            precio : "260",
            tecnica:"Karla Sofía Rivas"
          },
          servicio03 : {
            nombre : "Manicura",
            descripcion : "",
            precio : "150",
            tecnica:"Ariana Patricia"
          },
          servicio04 : {
            nombre : "Pedicura Spa",
            descripcion : "",
            precio : "300",
            tecnica:"Renee Jimenez"
          },
          servicio05 : {
            nombre : "Pedicura Brasile\u00f1o",
            descripcion : "",
            precio : "200",
            tecnica:"Laura Sierra"
          }
        }
        $scope.clients = [
          {nombre : "Ana",apellido: "Noriega"},
          {nombre : "Florencia",apellido: "Sau"}
        ];

        $scope.addNewCliente = function(){
            var lista = document.getElementById("infoCliente").style;
		        lista.display = "block";
            var menos = document.getElementById("cancelCliente").style;
		        menos.display = "inline";
            $scope.nombreC=$scope.clientes
        }

        $scope.saveNewCliente = function(){
          $scope.clients.push({'nombre':$scope.nombreC,
          'apellido':$scope.apellidoC,'direccion':$scope.dirC,
          'correo':$scope.correoC,'telefono':$scope.telC,'fecha':$scope.fechaC});
          var lista = document.getElementById("infoCliente").style;
          lista.display = "none";
          var menos = document.getElementById("cancelCliente").style;
          menos.display = "none";
          $scope.nombreC="";
          $scope.apellidoC="";
          $scope.dirC="";
          $scope.correoC="";
          $scope.telC="";
          $scope.fechaC="";
          console.log($scope.clients);
        }
        $scope.total=0;
        $scope.addCosto = function (producto,id,cantidad){
          console.log(producto);
          var costo;
          var tecnica="";
          var contador=0;
          for (var i in $scope.productos) {//buscamos el costo del producto
            if(producto === $scope.productos[i].nombre){
                console.log($scope.productos[i].precio);
                costo=$scope.productos[i].precio;
                if($scope.productos[i].tecnica){
                  console.log("existe tecnica")
                  tecnica=$scope.productos[i].tecnica;
                  console.log(tecnica)
                }
                break;
            }
            contador++;
          }
          console.log(contador +"==" +$scope.productos.length);
          if($scope.listaCostosProd.length >0 ){
            for (var j in $scope.listaCostosProd) {
              if(id == $scope.listaCostosProd[j].id){
                $scope.listaCostosProd[j].precio=costo;
                $scope.listaCostosProd[j].nombre=producto;
                $scope.listaCostosProd[j].tecnica=tecnica;
                $scope.listaCostosProd[j].cantidad=cantidad;
                break;
              }else{
                $scope.listaCostosProd.push({'id':id,'nombre':producto,'precio':costo,'tecnica':tecnica,
                                              'cantidad':cantidad});
                break;
              }
            }
          }else if($scope.listaCostosProd.length==0 && contador != $scope.productos.length){
            $scope.listaCostosProd.push({'id':id,'nombre':producto,'precio':costo,'tecnica':tecnica,
                                          'cantidad':cantidad});
          }
          console.log($scope.listaCostosProd);
          $scope.total=0;
          for (var j in $scope.listaCostosProd) {
            $scope.total=$scope.total+($scope.listaCostosProd[j].precio*$scope.listaCostosProd[j].cantidad)
          }
        };
        $scope.fecha=new Date();
        $scope.listaNota = [{id: '1'}];
        $scope.listaCostosProd =[];
        $scope.addNewChoice = function() {
          var newItemNo = $scope.listaNota.length+1;
          $scope.listaNota.push({'id':newItemNo});
        };
        $scope.removeChoice = function() {
          $scope.listaCostosProd.splice(lastItem)
          var lastItem = $scope.listaNota.length-1;
          $scope.listaNota.splice(lastItem);
        };
        $scope.obtenerTotal = function(cantidad,precio){
          console.log(cantidad*precio)
          /*for (var j in $scope.listaCostosProd) {
            total=total+$scope.listaCostosProd[j].precio;
          }*/
        }
        $scope.cancelCliente = function(){
          var lista = document.getElementById("infoCliente").style;
          lista.display = "none";
          var menos = document.getElementById("cancelCliente").style;
          menos.display = "none";
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

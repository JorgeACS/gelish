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
      templateUrl: 'agregarProducto',
      controller:function($scope,$http,$window){

        $scope.categorias = {
          categoria01 : {
            nombre: "Foundation"
          }
        }
        $scope.agregarProducto = function(){
          prod = {
              nombre : $scope.nombre,
              descripcion : $scope.descripcion,
              cantidad : $scope.cantidad,
              precio : $scope.precio,
              categoria_id : $scope.categoriaSeleccionada.id
          }
          $http.post('/producto',prod).then((res) =>{
            console.log(res.data);
            alert("Producto '"+prod.nombre+"' insertado correctamente.")
            $window.location.href = "/";
          })
        }
       $http.get('/categoria').then((res) =>{
          $scope.categorias = res.data
          console.log(res.data.categorias);
          /*if(res2.data.caja_id == null){
            console.log("nay")
          }else{
            console.log("yay")
          }*/
        });
      }
    }).when("/editarProducto", {
      templateUrl: 'editarProducto',
      controller:function($scope,$http,$window){

        $http.get('/categoria').then((res)=>{
          $scope.categorias = res.data;
        });

        $http.get('/producto').then((res)=>{
          $scope.productos = res.data;
        });


        $scope.enableFieldset = function(){
           document.getElementById("editFieldset").disabled = false;
        }
        $scope.editarProducto = function() {
          document.getElementById("editFieldset").disabled = true;
          data = {
            producto : {
              nombre : $scope.productoSeleccionado.nombre,
              precio : $scope.productoSeleccionado.precio,
              cantidad : $scope.productoSeleccionado.cantidad,
              descripcion : $scope.productoSeleccionado.descripcion,
              categoria_id : $scope.categoriaSeleccionada.id
            },
            id : $scope.productoSeleccionado.id
          }
          $http.put("/producto", data)
           .then((res)=>{
            alert("Producto '" + data.producto.nombre + "' editado exitosamente");
            console.log("Producto editado correctamente");
            $window.location.href = "/";
           });
        }
      }
    }).when("/eliminarProducto", {
      templateUrl: 'eliminarProducto',
      controller:function($scope,$http,$window){

        $http.get('/producto').then((res)=>{
          $scope.productos = res.data;
        });
        $scope.eliminarProducto = function(){

          var producto_id = $scope.productoSeleccionado.id;
          $http.delete("/producto", {params:{id:producto_id}}).then((res)=>{
            alert("Administrador de sucursal eliminado exitosamente");
            console.log("Administrador de sucursal  eliminado correctamente");
            $window.location.href = "/";
          });
        }
      }
    }).when("/agregarServicio", {
      templateUrl: 'agregarServicio'
    }).when("/editarServicio", {
      templateUrl: 'editarServicio',
      controller:function($scope){
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
      }
    }).when("/eliminarServicio", {
      templateUrl: 'eliminarServicio'
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas',
      controller:function($scope){
        angular.element(document).ready(function () {
          cargarGraficas();
        });
      }
    }).when("/agregarRecepcionista", {
      templateUrl: 'agregarRecepcionista'
    }).when("/editarRecepcionista", {
      templateUrl: 'editarRecepcionista',
      controller:function($scope){
        $scope.sucursales = {
            sucursal01 : {plaza : "Dila", ciudad : "Hermosillo", direccion : "Plaza Dila", telefono : "2-11-33-12",admin : "Dunia Morales"},
            sucursal02 : {plaza : "Cantabria",ciudad : "Hermosillo", direccion : "Cantabria", telefono : "2-03-33-33",admin : "Lourdes Archuleta"}
        }
        $scope.recepcionistas = {
            recepcionista01 : {
              nombre : "Yadira",
              apellido_paterno : "Rodriguez",
              apellido_materno : "",
              telefono : "2-00-00-00",
              sucursal : "Dila"
             },
            recepcionista02 : {
              nombre : "Berenice",
              apellido_paterno : "Vega",
              apellido_materno : "",
              telefono : "2-11-11-11",
              sucursal : "Dila"
            },
            recepcionista03 : {
              nombre : "Irma",
              apellido_paterno : "Navarro",
              apellido_materno : "",
              telefono : "2-22-22-22",
              sucursal : "Cantabria"
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
        $scope.sucursales = {
            sucursal01 : {plaza : "Dila", ciudad : "Hermosillo", direccion : "Plaza Dila", telefono : "2-11-33-12",admin : "Dunia Morales"},
            sucursal02 : {plaza : "Cantabria",ciudad : "Hermosillo", direccion : "Cantabria", telefono : "2-03-33-33",admin : "Lourdes Archuleta"}
        }
        $scope.tecnicas = {
            tecnica01 : {
              nombre : "Giovana",
              apellido_paterno : "Flores",
              apellido_materno : "",
              telefono : "2-44-44-44",
              sucursal : "Dila"
             },
            tecnica02 : {
              nombre : "Miriam",
              apellido_paterno : "Lagarda",
              apellido_materno : "",
              telefono : "2-55-55-55",
              sucursal : "Dila"
            },
            tecnica03 : {
              nombre : "Norma",
              apellido_paterno : "Ramirez",
              apellido_materno : "",
              telefono : "2-66-66-66",
              sucursal : "Cantabria"
            },
            tecnica04 : {
              nombre : "Mayela",
              apellido_paterno : "Lagarda",
              apellido_materno : "",
              telefono : "2-77-77-77",
              sucursal : "Cantabria"
            },
            tecnica05 : {
              nombre : "Adriana",
              apellido_paterno : "Morales",
              apellido_materno : "",
              telefono : "2-88-88-88",
              sucursal : "Cantabria"
            },
            tecnica06 : {
              nombre : "Karla",
              apellido_paterno : "Ripalda",
              apellido_materno : "",
              telefono : "2-99-99-99",
              sucursal : "Dila"
            }
        }
      }
    }).when("/eliminarTecnica", {
      templateUrl: 'eliminarTecnica'
    })
  $locationProvider.html5Mode(true);
});

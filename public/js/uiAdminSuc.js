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
            alert("Producto "+ $scope.productoSeleccionado.nombre+" eliminado exitosamente");
            console.log("Producto "+ $scope.productoSeleccionado.nombre+"  eliminado correctamente");
            $window.location.href = "/";
          });
        }
      }
    }).when("/agregarServicio", {
      templateUrl: 'agregarServicio',
      controller:function($scope,$http,$window){
        $scope.agregarServicio = function(){
          serv = {
              nombre : $scope.nombre,
              descripcion : $scope.descripcion,
              precio : $scope.precio
          }
          $http.post('/servicio',serv).then((res) =>{
            console.log(res.data);
            alert("Servicio '"+serv.nombre+"' insertado correctamente.")
            $window.location.href = "/";
          })
        }
      }
    }).when("/editarServicio", {
      templateUrl: 'editarServicio',
      controller:function($scope,$http,$window){
       
        $http.get('/servicio').then((res)=>{
          $scope.servicios = res.data;
        });

        $scope.enableFieldset = function(){
           document.getElementById("editFieldset").disabled = false;
        }
        $scope.editarServicio = function() {
          document.getElementById("editFieldset").disabled = true;
          data = {
            servicio : {
              nombre : $scope.servicioSeleccionado.nombre,
              precio : $scope.servicioSeleccionado.precio,
              descripcion : $scope.servicioSeleccionado.descripcion
            },
            id : $scope.servicioSeleccionado.id
          }
          $http.put("/servicio", data)
           .then((res)=>{
            alert("Servicio '" + data.servicio.nombre + "' editado exitosamente");
            console.log("Servicio editado correctamente");
            $window.location.href = "/";
           });
        }
      }
    }).when("/eliminarServicio", {
      templateUrl: 'eliminarServicio',
      controller:function($scope,$http,$window){
        $http.get('/servicio').then((res)=>{
          $scope.servicios = res.data;
        });
        $scope.eliminarServicio = function(){

          var servicio_id = $scope.servicioSeleccionado.id;
          $http.delete("/servicio", {params:{id:servicio_id}}).then((res)=>{
            alert("Servicio "+$scope.servicioSeleccionado.nombre + " eliminado exitosamente");
            console.log("Servicio "+ $scope.servicioSeleccionado.nombre + " eliminado correctamente");
            $window.location.href = "/";
          });
        }
      }
    }).when("/reporteTecnicas", {
      templateUrl: 'reporteTecnicas',
      controller:function($scope){
        angular.element(document).ready(function () {
          cargarGraficas();
        });
      }
    }).when("/agregarRecepcionista", {
      templateUrl: 'agregarRecepcionista',
      controller:function($scope,$window, $http) {
        $scope.agregarTecnica = function() {
          user={
            username: $scope.username,
            password:$scope.password,
            nombre:$scope.nombre,
            apellido:$scope.apellido,
            correo:$scope.correo,
            telefono:$scope.telefono,
            tipo:2
          };
          //console.log($locals.user);
          $http.post('/usuario',user).then((res) => {
            alert("Recepcionista insertada exitosamente");
            console.log("Recepcionista insertada correctamente");
            $window.location.href = "/";
          })

        };
        $scope.regex = '[0-9]+';
      }
    }).when("/editarRecepcionista", {
      templateUrl: 'editarRecepcionista'
    }).when("/eliminarRecepcionista", {
      templateUrl: 'eliminarRecepcionista',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:2}}).then((res)=>{
          $scope.recepcionistas = res.data;
        });
        
        $scope.eliminarRecepcionista = function() {
          var user_id = $scope.recepcionistaSeleccionada.id;
          $http.delete("/usuario", {params:{id:user_id}}).then((res)=>{
            alert("Recepcionista eliminada exitosamente");
            console.log("Recepcionista eliminada correctamente");
            $window.location.href = "/";
           });
        }
      }
    }).when("/agregarTecnica", {
      templateUrl: 'agregarTecnica',
      controller:function($scope,$window, $http) {
        
        $scope.agregarTecnica = function() {
          user={
            nombre:$scope.nombre,
            apellido:$scope.apellido,
            correo:$scope.correo,
            telefono:$scope.telefono,
            tipo:3
          };
          //console.log($locals.user);
          $http.post('/usuario',user).then((res) => {
            alert("Tecnica insertada exitosamente");
            console.log("Tecnica insertada correctamente");
            $window.location.href = "/";
          })

        };
        $scope.regex = '[0-9]+';
      }
    }).when("/editarTecnica", {
      templateUrl: 'editarTecnica',
      controller:function($scope,$http,$window){
        
        $scope.opcionesTecnica = [{
          id: true,
          label: 'Activo'
        }, {
          id: false,
          label: 'Inactivo'
        }];
        $http.get('/usuario',{params:{tipo:3}}).then((res)=>{
          $scope.tecnicas = res.data;
        });

        $scope.enableFieldset = function(){
           document.getElementById("editFieldset").disabled = false;
        }
        $scope.editarAdmin = function() {
          document.getElementById("editFieldset").disabled = true;
          data = {
            usuario : {
              nombre : $scope.tecnicaSeleccionada.nombre,
              apellido : $scope.tecnicaSeleccionada.apellido,
              telefono : $scope.tecnicaSeleccionada.telefono,
              correo : $scope.tecnicaSeleccionada.correo
            },
            estado : $scope.tecnicaSeleccionada.estado
          }
          $http.put("/usuario", data)
           .then((res)=>{
            alert("Administrador de sucursal editado exitosamente");
            console.log("Administrador de sucursal editado correctamente");
            $window.location.href = "/";
           });
        }
      }
    }).when("/eliminarTecnica", {
      templateUrl: 'eliminarTecnica',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:3}}).then((res)=>{
          $scope.tecnicas = res.data;
        });
        
        $scope.eliminarTecnica = function() {
          var tecnica_id = $scope.tecnicaSeleccionada.id;
          $http.delete("/usuario", {params:{id:tecnica_id}}).then((res)=>{
            alert("Tecnica eliminada exitosamente");
            console.log("Tecnica  eliminada correctamente");
            $window.location.href = "/";
           });
        }
      }
    });
  $locationProvider.html5Mode(true);
});

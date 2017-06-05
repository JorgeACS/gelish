

var app = angular.module('admin', ['ngRoute','ngMessages']);
//angular.module('admin', ['ngMessages']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/logout", {
      template: '',
      controller: function($window, $http) {
        $http.delete('/logout').then(function (res) {
          $window.location.href = '/'
        }).catch(function (res) {
          console.log('Error', res);
        });
      }
    }).when("/agregarAdmin", {
      templateUrl: 'agregarAdmin',
      controller:function($scope,$window, $http) {
        $scope.onlyNumbers = /^\d+$/;
        $scope.agregarAd = function(){
          if($scope.password != $scope.password2){
            window.alert("No coinciden las contraseñas")
          }else{
            user={
              username: $scope.username,
              password:$scope.password,
              nombre:$scope.nombre,
              apellido:$scope.apellido,
              correo:$scope.correo,
              telefono:$scope.telefono,
              tipo:1
            };
            //console.log($locals.user);
            $http.post('/usuario',user).then((res) => {
              alert("Administrador de sucursal insertado exitosamente");
              console.log("Administrador de sucursal insertado correctamente");
              $window.location.href = "/";
            })
          }
        }
      }
    }).when("/editarAdmin", {
      templateUrl: 'editarAdmin',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
          $scope.originalAdmins = res.data;
        });
        $scope.enableFieldset = function(){
           document.getElementById("editFieldset").disabled = false;
        }
        $scope.editarAdmin = function() {
          document.getElementById("editFieldset").disabled = true;
          data = {
            usuario : {
              nombre : $scope.adminSeleccionado.nombre,
              apellido : $scope.adminSeleccionado.apellido,
              telefono : $scope.adminSeleccionado.telefono,
              correo : $scope.adminSeleccionado.correo
            },
            id : $scope.adminSeleccionado.id
          }
          $http.put("/usuario", data)
           .then((res)=>{
            alert("Administrador de sucursal editado exitosamente");
            console.log("Administrador de sucursal editado correctamente");
            $window.location.href = "/";
           });
        }
      }
    }).when("/eliminarAdmin", {
      templateUrl: 'eliminarAdmin',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });

        $scope.eliminarAdmin = function() {
          var user_id = $scope.adminSeleccionado.id;
          $http.delete("/usuario", {params:{id:user_id}}).then((res)=>{
            alert("Administrador de sucursal eliminado exitosamente");
            console.log("Administrador de sucursal  eliminado correctamente");
            $window.location.href = "/";
           });
        }
      }

    }).when("/agregarSucursal", {
      templateUrl: 'agregarSucursal',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });
        $scope.onlyNumbers = /^\d+$/;
        $scope.agregarSucursal = function() {

          /*if($scope.adminSeleccionado == null){//seria validar si el admin existe ya que ahora se puede autocompletar
            alert("Seleccione un administrador de sucursal.");
            return;
          }*/
          var suc={
            plaza:$scope.plaza,
            ciudad:$scope.ciudad,
            telefono:$scope.telefono,
          };
          var data ={
            sucursal : suc,
            admin_id : $scope.adminSeleccionado.id
          }
          $http.post('/sucursal',data).then((res) => {
            alert("Sucursal insertada exitosamente");
            console.log("Sucursal insertada correctamente");
            $window.location.href = "/";
          })

        }
      }
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal',
      controller:function($scope,$http,$window){
        $scope.enableFieldset = function(){
           document.getElementById("editFieldset").disabled = false;
        }
        $http.get('/sucursal').then((res) =>{
          $scope.sucursales = res.data;
        })

        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });

        $scope.editarSucursal = function() {

          if($scope.adminSeleccionado == null){
            alert("Seleccione un administrador de sucursal.");
            return;
          }
          document.getElementById("editFieldset").disabled = true;
          data = {
            sucursal : {
              plaza : $scope.sucursalSeleccionada.plaza,
              ciudad : $scope.sucursalSeleccionada.ciudad,
              telefono : $scope.sucursalSeleccionada.telefono
            },
            sucursal_id : $scope.sucursalSeleccionada.id,
            admin_id : $scope.adminSeleccionado.id
          }
          $http.put("/sucursal", data)
           .then((res)=>{
            alert("Sucursal editada exitosamente");
            console.log("Sucursal editada exitosamente");
            $window.location.href = "/";
          });
        }
      }
    }).when("/eliminarSucursal", {
      templateUrl: 'eliminarSucursal',
      controller:function($scope,$http,$window){
        $http.get('/sucursal',{params:{tipo:1}}).then((res)=>{
          $scope.sucursales = res.data;
        });

        $scope.eliminarSucursal = function() {
          var sucursal_id = $scope.sucursalSeleccionada.id;
          $http.delete("/sucursal", {params:{id:sucursal_id}}).then((res)=>{
            alert("Sucursal eliminada exitosamente");
            console.log("Sucursal eliminada correctamente");
            $window.location.href = "/";
           });
        }
      }
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

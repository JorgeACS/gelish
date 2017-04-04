var app = angular.module('admin', ['ngRoute']);
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
        $scope.agregarAdmin = function() {
          user={
            username: $scope.username,
            password:$scope.password,
            nombre:$scope.nombre,
            apellido:$scope.apellido,
            correo:$scope.correo,
            telefono:$scope.tel,
            tipo:2
          };
          //console.log($locals.user);
          $http.post('/usuario',user).then((res) => {
            alert("Administrador de sucursal insertado exitosamente");
            console.log("Administrador de sucursal insertado correctamente");
            $window.location.href = "/";
          })

        }
      }
    }).when("/editarAdmin", {
      templateUrl: 'editarAdmin',
      controller:function($scope,$http,$window){
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });
        
        $scope.editarAdmin = function() {
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
      controller:function($scope,$http){
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });
      }
    }).when("/editarSucursal", {
      templateUrl: 'editarSucursal',
      controller:function($scope,$http){
        $scope.sucursales = {
            sucursal01 : {plaza : "Dila", ciudad : "Hermosillo", direccion : "Plaza Dila", telefono : "2-11-33-12",admin : "Dunia Morales"},
            sucursal02 : {plaza : "Cantabria",ciudad : "Hermosillo", direccion : "Cantabria", telefono : "2-03-33-33",admin : "Lourdes Archuleta"}
        }
        $http.get('/usuario',{params:{tipo:1}}).then((res)=>{
          $scope.admins = res.data;
        });
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
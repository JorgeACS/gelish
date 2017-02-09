var app = angular.module('uiLogin', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.InicioSesion = function() {
      $http.get("/login")
      .success(function(data){
        console.log(data);
      })
      .error(function(error){

      });
      this.$location.path('/admin');
    };
});

var app = angular.module('logout', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.cerrarSesion = function() {
      $http.delete("/logout")
      .success(function(data){
        console.log(data);
         this.$location.path('/login');
      })
      .error(function(error){

      });
     
    };
});

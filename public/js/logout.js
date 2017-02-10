var app = angular.module('uiLogout', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.SalirSesion = function() {
      $http.delete("/logout")
      .success(function(data){
        console.log(data);
      })
      .error(function(error){

      });
      this.$location.path('/login');
    };
});

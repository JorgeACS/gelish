var app = angular.module('uiLogin', []);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.InicioSesion = function() {
      console.log("click");
      user={
        username: $scope.username,
        password:$scope.password
      };
      console.log(user.username);
      console.log(user.password);
      $http.post('/login',user).then((res) => {
        if(res.data.tipo==1){
          $location.path('admin');
        }
      })
    };
});
      /*$http.get("http://localhost:3000/login")
      .success(function(data){
        console.log("Va");
      })
      .error(function(error){

      });
      this.$location.path('/admin');
    };*/

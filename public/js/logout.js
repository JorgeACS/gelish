var app = angular.module('logout', ['ngRoute']);
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
    });
  $locationProvider.html5Mode(true);
});

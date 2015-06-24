angular.module('edify.signin', [
  'ui.router'
])

.controller('SigninController', function ($scope, $state, $http, Auth) {

  $scope.getProfile = function () {
    if (Auth.isAuth()) {
      $scope.user = Auth.user();
      $state.go('home'); //redirect to home page
    } else {
      Auth.getUser()
        .success(function(data, status) {
          console.log('Logged in;', data);
          Auth.setUser(data);
          $state.go('home'); //redirect to home page
        })
        .error(function(data, status) {
          console.log('ERROR:', status);
        });
    }
  };

  $scope.getProfile();
});
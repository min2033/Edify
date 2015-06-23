angular.module('edify.user', [
  'ui.router'
])

.controller('UserController', function($scope, $stateParams, Users) {
  $scope.user;

  $scope.getUser = function () {
    Users.getUser($stateParams.username) //  We need to pass something into the service to retrieve one user
    .then(function (user) {
      $scope.user = user;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getUser();

});

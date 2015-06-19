angular.module('edify.user', [])

.controller('UserController', function($scope, Users) {
  $scope.user;

  $scope.getUser = function () {
    Users.getUser('jp') //  We need to pass something into the service to retrieve one user
    .then(function (user) {
      $scope.user = user;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

});

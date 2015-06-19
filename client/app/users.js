angular.module('edify.users', [])

.controller('UsersController', function($scope, Users) {
  $scope.user;

  $scope.getUser = function () {
    Users.getUser(****) //  We need to pass something into the service to retrieve one user
    .then(function () {

    })
    .catch(function (error) {
      console.error(error);
    });
  };

});

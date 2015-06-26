angular.module('edify.allusers', [])

.controller('AllUsersController', function($scope, Auth, Users) {

  $scope.allUsers = [];
  $scope.sort = '-learners';

  $scope.getProfile = function () {
    if (Auth.isAuth()) {
      $scope.user = Auth.user();
    } else {
      Auth.getUser()
        .then(function(data) {
          $scope.user = data.data;
      });
    }
  };

  $scope.getProfile();


  $scope.getAllUsers = function () {
    Users.getAllUsers()
    .then(function (users) {
      var obj = {};
      $scope.allUsers = users;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllUsers();

  $scope.setSort = function (option) {
    $scope.sort = option;
  };



});

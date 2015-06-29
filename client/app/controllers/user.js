angular.module('edify.user', [
  'ui.router'
])

.controller('UserController', function($scope, $stateParams, $state, Users, Auth) {
  $scope.user = null;

  $scope.getUser = function () {

    //if user clicks on their own profile, take them to the profile page
    if ($stateParams.username === Auth.user().username) {
      $state.go('home');
      return;
    }

    Users.getUser($stateParams.username)
    .then(function (user) {
      $scope.user = user;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getUser();

  ////////////////////////////////////////////////////////////////
  // Support method for incomplete feature: UPVOTING OTHER USERS
  //   this method helps identify the user who clicked the upvote
  $scope.getVoter = function () {
    return Auth.user();
  };
  ////////////////////////////////////////////////////////////////
});

angular.module('edify.user', [
  'ui.router'
])

.controller('UserController', function($scope, $stateParams, $state, Users, Auth, Level) {

  $scope.user = null;

  $scope.getUser = function () {
    Users.getUser($stateParams.username)
    .then(function (user) {
      $scope.user = user;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getUser();

  $scope.levelToWord = function(level) {
    return Level.toWord(level);
  };


  ////////////////////////////////////////////////////////////////
  // Support method for incomplete feature: UPVOTING OTHER USERS
  //   this method helps identify the user who clicked the upvote
  $scope.getVoter = function () {
    return Auth.user();
  };
  ////////////////////////////////////////////////////////////////
});

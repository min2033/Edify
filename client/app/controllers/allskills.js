angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Skills) {
  

  $scope.getAllSkills = function () {
    /* example
    Users.getUser('jp')
    .then(function (user) {
      $scope.user = user;
    })
    .catch(function (error) {
      console.error(error);
    });
    */
  };

});

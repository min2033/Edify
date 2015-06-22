angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Skills) {
  $scope.allSkills;

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      $scope.allSkills = skills;
    });
  };
});

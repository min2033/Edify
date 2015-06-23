angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Skills) {
  $scope.allSkills = [];

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      for (var key in skills) {
        $scope.allSkills.push(key);    
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  };
  $scope.getAllSkills();
});

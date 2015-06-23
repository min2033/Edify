angular.module('edify.skill', [
  'ui.router'
])

.controller('SkillController', function($scope, $stateParams, Skills) {

  $scope.skillname = $stateParams.skillname;

  $scope.getSkill = function () {
    Skills.getSkill($stateParams.skillname)
    .then(function (skills) {
      $scope.learners = skills.learners;
      $scope.teachers = skills.teachers;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getSkill();

});

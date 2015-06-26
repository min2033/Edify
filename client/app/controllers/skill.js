angular.module('edify.skill', [
  'ui.router'
])

.controller('SkillController', function($scope, $stateParams, Skills, Auth) {

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

  $scope.addLearnSkill = function(skillName) {
    var skill = {
      type: 'learn',
      skill: skillName,
      skillLevel: 1,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to learn!');
    });
  };

  $scope.addTeachSkill = function(skillName) {
    var skill = {
      type: 'teach',
      skill: skillName,
      skillLevel: 1,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to teach!');
    });
  };

  $scope.getVoter = function() {
    return Auth.user().username;
  };
});

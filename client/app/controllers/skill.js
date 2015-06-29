angular.module('edify.skill', [
  'ui.router'
])

.controller('SkillController', function($scope, $stateParams, Skills, Auth, Level) {

  $scope.skillname = $stateParams.skillname;

  $scope.levelToWord = function(level) {
    return Level.toWord(level);
  };

  $scope.getSkill = function () {
    Skills.getSkill($stateParams.skillname)
    .then(function (skill) {
      $scope.learners = skill.learners;
      $scope.teachers = skill.teachers;
      $scope.skill_id = skill.skill_id;
      $scope.skill_description = skill.skill_description;
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

  ////////////////////////////////////////////////////////////////
  // Support method for incomplete feature: UPVOTING OTHER USERS
  //   this method helps identify the user who clicked the upvote
  $scope.getVoter = function() {
    return Auth.user();
  };
  ////////////////////////////////////////////////////////////////
});

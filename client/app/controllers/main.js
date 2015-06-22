angular.module('edify.main', [])

.controller('MainController', function($scope, Auth, Users, Skills) {
  $scope.user;

  $scope.getProfile = function () {
    if (Auth.isAuth()) {
      $scope.user = Auth.user;
    } else {
      Auth.getUser()
        .then(function(data) {
          $scope.user = data.data;
      });
    }
  };

  $scope.getProfile();

  $scope.increaseLearnSkillLevel = function(index) {
    console.log('learn skill level increased!');
    $scope.user.learnSkills[index].skill_level += 1;
  };

  $scope.decreaseLearnSkillLevel = function(index) {
    console.log('learn skill level decreased!');
    $scope.user.learnSkills[index].skill_level -= 1;
  };

  $scope.saveLearnSkill = function(index) {
    console.log('learn skill level saved!');
  };

  $scope.removeLearnSkill = function(index) {
    var skillId = $scope.user.learnSkills[index].id;
    $scope.user.learnSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'learn')
      .then(function(data) {
        console.log('learn skill removed!');  
      });
  };

  $scope.increaseTeachSkillLevel = function(index) {
    console.log('teach skill increased!');
  };

  $scope.decreaseTeachSkillLevel = function(index) {
    console.log('teach skill decreased!');
  };

  $scope.saveTeachSkill = function(index) {
    console.log('teach skill level saved!');
  };

  $scope.removeTeachSkill = function(index) {
    var skillId = $scope.user.learnSkills[index].id;
    $scope.user.teachSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'teach')
      .then(function(data) {
        console.log('teach skill removed!');
      });
  };

});

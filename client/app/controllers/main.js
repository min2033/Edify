angular.module('edify.main', [])

.controller('MainController', function($rootScope, $scope, $modal, Auth, Users, Skills) {

  Auth.getUser()
    .success(function(data, status) {
      $scope.user = data;
    })
    .error(function(data, status) {
      console.log('ERROR:', status);
    });

  var update = function(){
    $scope.user = Auth.user();
  };

  $rootScope.$on('skillChange', update);

  // TODO: see #150

  $scope.levels = [
    'wat',
    'noob',
    'adventurer',
    'enthusiast',
    'practicioner',
    'master',
    'sorcerer'
  ];


  $scope.updateUser = function() {

    // Disable editing zip code in the demo version
    // if (!$scope.zip_form.$valid) {
    //   alert('Please enter valid zip code');
    //   return;
    // }

    var user = {
      blurb: $scope.user.blurb,
      userId: $scope.user.id
      // zip: $scope.user.zip,
    };

    console.log(user);

    Users.putUser(user).then(function(data) {
      console.log('saved user data!');
    });
  };


  $scope.increaseLearnSkillLevel = function(index) {
    $scope.user.learnSkills[index].skill_level += 1;
  };

  $scope.decreaseLearnSkillLevel = function(index) {
    $scope.user.learnSkills[index].skill_level -= 1;
  };

  $scope.saveLearnSkill = function(index) {
    $scope.saving = true;
    var skill = {
      type: 'learn',
      skill: $scope.user.learnSkills[index].skill_name,
      skillLevel: $scope.user.learnSkills[index].skill_level,
      userId: $scope.user.id,
      blurb: $scope.user.learnSkills[index].blurb
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('learn skill saved!');
      $scope.saving = false;
    });
  };

  $scope.removeLearnSkill = function(index) {
    var skillId = $scope.user.learnSkills[index].id;
    $scope.user.learnSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'learn')
      .then(function(data) {
        console.log(data);
      });
  };

  $scope.increaseTeachSkillLevel = function(index) {
    $scope.user.teachSkills[index].skill_level += 1;
  };

  $scope.decreaseTeachSkillLevel = function(index) {
    $scope.user.teachSkills[index].skill_level -= 1;
  };

  $scope.saveTeachSkill = function(index) {
    var skill = {
      type: 'teach',
      skill: $scope.user.teachSkills[index].skill_name,
      skillLevel: $scope.user.teachSkills[index].skill_level,
      userId: $scope.user.id,
      blurb: $scope.user.teachSkills[index].blurb
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('teach skill saved!');
    });
  };

  $scope.removeTeachSkill = function(index) {
    var skillId = $scope.user.teachSkills[index].id;
    $scope.user.teachSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'teach')
      .then(function(data) {
        console.log(data);
      });
  };

  // For Modals

  $scope.open = function(type){
    if(type === "learn"){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/templates/modals/learn.html',
        controller: 'learnModalController',
        size: 'lg',
        resolve: {
          items: function () {
            return true;
            // return $scope.items;
          }
        }
      });
    }else if(type === "teach"){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/templates/modals/teach.html',
        controller: 'teachModalController',
        size: 'lg',
        resolve: {
          items: function () {
            return true;
            // return $scope.items;
          }
        }
      });
    }

    modalInstance.result.then(function(){
      // Refetch the user data after modal close.
      console.log('modal closed!');
      Auth.getUser()
        .success(function(data, status) {
          $scope.user = data;
        })
        .error(function(data, status) {
          console.log('ERROR:', status);
        });
    });
  };

});

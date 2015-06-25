angular.module('edify.modal',[])

.controller('learnModalController',function($scope,$modalInstance,Auth,Skills,items){

  $scope.items = items;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.allSkills = [];
  $scope.sort = '-learners';

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

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      var obj = {};
      var userSkills = Auth.user().learnSkills;
      var alreadyHave = [];
      for (var i = 0; i < userSkills.length; i++) {
        alreadyHave.push(userSkills[i].skill_name);
      };

      for (var key in skills) {
        obj.skill_name = key;
        obj.learners = skills[key].learners;
        obj.teachers = skills[key].teachers;
        obj.skill_id = skills[key].skill_id;
        if(alreadyHave.indexOf(key) === -1) $scope.allSkills.push(obj);
        obj = {};
      }
      // console.log('allSkills', $scope.allSkills);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();

  $scope.setSort = function (option) {
    $scope.sort = option;
  };

  $scope.addLearnSkill = function(skill) {
    var name = skill.skill_name;
    var skill = {
      type: 'learn',
      skill: name,
      skillLevel: 1,
      userId: $scope.user.id
    };
    // Remove Item from the skills List
    var index = -1;
    for (var i = 0; i < $scope.allSkills.length; i++) {
      var cur = $scope.allSkills[i];
      if(cur.skill_name === name){
        index = i;
      }
    };
    if(index !== -1) $scope.allSkills.splice(index,1);

    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to learn!');
    });
  };


})
.controller('teachModalController',function($scope,$modalInstance,Auth,Skills,items){

  $scope.items = items;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.allSkills = [];
  $scope.sort = '-learners';

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

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      var obj = {};
      var userSkills = Auth.user().teachSkills;
      var alreadyHave = [];
      for (var i = 0; i < userSkills.length; i++) {
        alreadyHave.push(userSkills[i].skill_name);
      };

      for (var key in skills) {
        obj.skill_name = key;
        obj.learners = skills[key].learners;
        obj.teachers = skills[key].teachers;
        obj.skill_id = skills[key].skill_id;
        if(alreadyHave.indexOf(key) === -1) $scope.allSkills.push(obj);
        obj = {};
      }
      // console.log('allSkills', $scope.allSkills);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();

  $scope.setSort = function (option) {
    $scope.sort = option;
  };

  $scope.addTeachSkill = function(skillName) {
  var skill = {
    type: 'teach',
    skill: skillName,
    skillLevel: 1,
    userId: $scope.user.id
  };
  // Remove Item from the skills List
  var index = -1;
  for (var i = 0; i < $scope.allSkills.length; i++) {
    var cur = $scope.allSkills[i];
    if(cur.skill_name === skillName){
      index = i;
    }
  };
  if(index !== -1) $scope.allSkills.splice(index,1);
  Skills.postSkill(skill).then(function(data) {
    console.log('added skill to teach!');
  });
};

});
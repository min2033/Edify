angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Auth, Skills) {

  // Use this assignment only for STATIC data testing
  //   - comment out when doing real database testing
  // $scope.allSkills = [
  //                     { skill_name: "javascript", learners: [{},{},{},{}], teachers: [{},{},{},{}], skill_id: 100 },
  //                     { skill_name: "backbone", learners: [{},{}], teachers: [{}], skill_id: 200 },
  //                     { skill_name: "angular", learners: [{},{},{}], teachers: [{},{},{}], skill_id: 300 },
  //                     { skill_name: "node", learners: [{},{},{},{},{}], teachers: [{},{}], skill_id: 400 },
  //                     { skill_name: "databases", learners: [{},{},{},{},{},{},{}], teachers: [], skill_id: 500 },
  //                     { skill_name: "java", learners: [{},{},{},{},{}], teachers: [{},{},{},{},{},{},{},{}], skill_id: 666 },
  //                     { skill_name: "data structures", learners: [{}], teachers: [{},{},{},{},{}], skill_id: 99 },
  //                    ];

  // USE this assignment for real database testing
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
      for (var key in skills) {
        obj.skill_name = key;
        obj.learners = skills[key].learners;
        obj.teachers = skills[key].teachers;
        obj.skill_id = skills[key].skill_id;
        $scope.allSkills.push(obj);
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

  $scope.addLearnSkill = function(index) {
    // debugger;
    var skill = {
      type: 'learn',
      // skill: $scope.allSkills[index].skill_name,
      skill: $scope.allSkills[index].skill_name,
      skillLevel: 1,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to learn!');
    });
  };

  $scope.addTeachSkill = function(index) {
    var skill = {
      type: 'teach',
      // skill: $scope.user.teachSkills[index].skill_name,
      skill: $scope.allSkills[index].skill_name,
      skillLevel: 1,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to teach!');
    });
  };


});

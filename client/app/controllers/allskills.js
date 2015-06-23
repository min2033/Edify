angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Auth, Skills) {

  // Use this assignment only for STATIC data testing
  //   - comment out when doing real database testing
  // $scope.allSkills = [
  //                     ["javascript", {learners: [{},{},{},{}], teachers: [{},{},{},{}], skill_id: 100} ],
  //                     ["backbone", {learners: [{},{}], teachers: [{}], skill_id: 200} ],
  //                     ["angular", {learners: [{},{},{}], teachers: [{},{},{}], skill_id: 300} ],
  //                     ["node", {learners: [{},{},{},{},{}], teachers: [{},{}], skill_id: 400} ],
  //                     ["databases", {learners: [{},{},{},{},{},{},{}], teachers: [], skill_id: 500} ],
  //                     ["java", {learners: [{},{},{},{},{}], teachers: [{},{},{},{},{},{},{},{}], skill_id: 666} ],
  //                     ["data structures", {learners: [{}], teachers: [{},{},{},{},{}], skill_id: 99} ],
  //                    ];

  // USE this assignment for real database testing
  $scope.allSkills = [];

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


  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      for (var key in skills) {
        // console.log([key, skills[key]]);
        $scope.allSkills.push([key, skills[key]]);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();

  $scope.addLearnSkill = function(index) {
    // debugger;
    var skill = {
      type: 'learn',
      // skill: $scope.allSkills[index].skill_name,
      skill: $scope.allSkills[index][0],
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
      skill: $scope.allSkills[index][0],
      skillLevel: 1,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('added skill to teach!');
    });
  };


});

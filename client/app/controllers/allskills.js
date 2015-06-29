angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Auth, Skills) {
  // the JSON data returned by the database looks like this:
  //   {
  //     "javascript" : {
  //                     learners: [{},{},{}],
  //                     teachers: [{},{},{}],
  //                     skill_id: 100
  //                    },
  //      "databases" : {
  //                     learners: [{},{},{}],
  //                     teachers: [{},{},{}],
  //                     skill_id: 500
  //                    }
  //   }

  //                                , 
  //                               /|\
  //                                |

  // We want to change the above format to an array that looks like below,
  //   then in the AllSkills template, display the skills using ng-repeat

  //                                |
  //                               \|/
  //                                `

  // Use the following for STATIC testing only. Comment out when pulling from the database.
  // $scope.allSkills = [
  //                     { skill_name: "javascript", learners: [{},{},{},{}], teachers: [{},{},{},{}], skill_id: 100 },
  //                     { skill_name: "backbone", learners: [{},{}], teachers: [{}], skill_id: 200 },
  //                     { skill_name: "angular", learners: [{},{},{}], teachers: [{},{},{}], skill_id: 300 },
  //                     { skill_name: "node", learners: [{},{},{},{},{}], teachers: [{},{}], skill_id: 400 },
  //                     { skill_name: "databases", learners: [{},{},{},{},{},{},{}], teachers: [], skill_id: 500 },
  //                     { skill_name: "java", learners: [{},{},{},{},{}], teachers: [{},{},{},{},{},{},{},{}], skill_id: 666 },
  //                     { skill_name: "data structures", learners: [{}], teachers: [{},{},{},{},{}], skill_id: 99 },
  //                    ];

  // Use this by default, comment out only when testing the above. Array will be populated by getAllSkills.
  $scope.allSkills = [];

  //  The default sort order is most to least number of learners
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

  //  Changes the JSON data from the server into an array.  See above for example.
  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      var obj = {};
      for (var key in skills) {
        obj.skill_name = key;
        obj.learners = skills[key].learners;
        obj.teachers = skills[key].teachers;
        obj.skill_id = skills[key].skill_id;
        obj.skill_description = skills[key].skill_description;
        $scope.allSkills.push(obj);
        obj = {};
      }
      console.log('allSkills', $scope.allSkills);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();  // immediately request and parse the JSON data from the database

  $scope.setSort = function (option) {
    $scope.sort = option;
  };

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


});

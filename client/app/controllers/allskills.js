angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Skills) {

  // Use this assignment only for STATIC data testing
  //   - comment out when doing real database testing
  $scope.allSkills = [
                      ["javascript", {learners: [{},{},{},{}], teachers: [{},{},{},{}], skill_id: 100} ],
                      ["backbone", {learners: [{},{}], teachers: [{}], skill_id: 200} ],
                      ["angular", {learners: [{},{},{}], teachers: [{},{},{}], skill_id: 300} ],
                      ["node", {learners: [{},{},{},{},{}], teachers: [{},{}], skill_id: 400} ],
                      ["databases", {learners: [{},{},{},{},{},{},{}], teachers: [], skill_id: 500} ],
                      ["java", {learners: [{},{},{},{},{}], teachers: [{},{},{},{},{},{},{},{}], skill_id: 666} ],
                      ["data structures", {learners: [{}], teachers: [{},{},{},{},{}], skill_id: 99} ],
                     ];

  // USE this assignment for real database testing
  // $scope.allSkills = [];

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      for (var key in skills) {
        $scope.allSkills.push([key, skills[key]]);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();

});

angular.module('edify.allskills', [])

.controller('AllSkillsController', function($scope, Skills) {

  // Use this assignment only for STATIC data testing
  //   - comment out when doing real database testing
  $scope.allSkills = [
                      ["JavaScript", {learners: [{},{},{},{}], teachers: [{},{},{},{}], skill_id: 100} ],
                      ["Backbone", {learners: [{},{}], teachers: [{}], skill_id: 200} ],
                      ["Angular", {learners: [{},{},{}], teachers: [{},{},{}], skill_id: 300} ],
                      ["Node", {learners: [{},{},{},{},{}], teachers: [{},{}], skill_id: 400} ],
                      ["Databases", {learners: [{},{},{},{},{},{},{}], teachers: [], skill_id: 500} ],
                      ["Java", {learners: [{},{},{},{},{}], teachers: [{},{},{},{},{},{},{},{}], skill_id: 666} ],
                      ["Data Structures", {learners: [{}], teachers: [{},{},{},{},{}], skill_id: 99} ],
                     ];

  // USE this assignment for real database testing
  // $scope.allSkills = [];

  $scope.getAllSkills = function () {
    Skills.getAllSkills()
    .then(function (skills) {
      for (var key in skills) {
        $scope.allSkills.push([key,result[key]]);    
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getAllSkills();

});

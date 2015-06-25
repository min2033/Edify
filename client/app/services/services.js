angular.module('edify.services', [])

.factory('Auth', function ($http, $location, $window) {
  var currentUser = null;

  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/api/profile'
    });
  };

  var user = function(){
    return currentUser;
  };

  var setUser = function(user){
    currentUser = user;
  };

  var isAuth = function () {
    return !!currentUser;
  };

  var signOut = function () {
    $http({
      method: 'GET',
      url: '/logout'
    });
    currentUser = null;
    $location.path('/signin');
  };

  return {
    user: user,
    getUser: getUser,
    setUser: setUser,
    isAuth: isAuth,
    signOut: signOut
  };
})
.factory('Users', function ($http) {

  var getUser = function(username){
    return $http({
      method: 'GET',
      url: '/api/users/' + username
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var postUser = function(user){
    return $http({
      method: 'POST',
      url: '/api/',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var putUser = function(user) {
    return $http({
      method: 'PUT',
      url: '/api/profile',
      data: user
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getUser: getUser,
    postUser: postUser,
    putUser: putUser
  };
})
.factory('Skills', function ($http) {

  var getAllSkills = function(){
    return $http({
      method: 'GET',
      url: '/api/skills/'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var getSkill = function(skillname){
    return $http({
      method: 'GET',
      url: '/api/skills/' + skillname
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var postSkill = function(skill){
    return $http({
      method: 'POST',
      url: '/api/skills/',
      data: skill
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var deleteSkill = function(userId, skillId, type) {
    return $http({
      method: 'POST',
      url: '/api/skills/delete',
      data: {
        type: type,
        skillId: skillId,
        userId: userId
      }
    })
    .then(function(response) {
      return response.data;
    });
  };

  return {
    getAllSkills: getAllSkills,
    postSkill: postSkill,
    deleteSkill: deleteSkill,
    getSkill: getSkill
  };
})
.directive('starRating', function () {
  return {
    restrict: 'A',
              // star is thumbs-up emoji
    template: '<span class="rating">'
              + '{{stars.length}}\&#x1f44d;'
              +'</span>',
    scope: {
      ratingValue: '=',
      max: '='
    },
    link: function (scope, elem, attrs) {
      scope.stars = [];
      for (var i = 0; i < scope.max; i++) {
        scope.stars.push({filled: i < scope.ratingValue});
      }
    }
  };
})
.directive('upVote', function () {
  return {
    restrict: 'E',
    template: '<div>'
              + '<button type="button" class="btn btn-default btn-sm" ng-click="upVoteUser()">'
              + '\&#x1f44d; this user'
              + '</button>'
              + '{{message}}'
              + '</div>',
    scope: {
      // message: '@',
      // upVoted: false
    },
    link: function (scope, elem, attrs) {
      scope.message = "";
      scope.upVoted = false;
      scope.upVoteUser = function () {
        if (!scope.upVoted) {
          scope.upVoted = true;
          scope.message = "Thanks for your feedback!";
        }
      };

      scope.saveUpvote = function () {

      };
    }
  };
});

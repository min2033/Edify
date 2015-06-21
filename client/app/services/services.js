angular.module('edify.services', [])

.factory('Auth', function ($http, $location, $window) {
  var currentUser = null;

  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/api/profile'
    });
  };

  var isAuth = function () {
    return !!currentUser;
  };

  var signout = function () {
    $location.path('/signin');
    currentUser = null;
  };

  return {
    user: currentUser,
    getUser: getUser,
    isAuth: isAuth
  };
})
.factory('Users', function ($http) {

  var getUser = function(username){
    return $http({
      method: 'GET',
      url: '/api/users/' + username
    })
    .then(function(resp){
      return resp.data
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
  }

  return {
    getUser: getUser,
    postUser: postUser
  };
})
.factory('Skills', function ($http) {

  var getSkill = function(skillname){
    return $http({
      method: 'GET',
      url: '/api/skills/' + skillname
    })
    .then(function(resp){
      return resp.data
    });
  };

  var postSkill = function(skill){
    return $http({
      method: 'POST',
      url: '/api/',
      data: skill
    })
    .then(function(resp){
      return resp.data;
    });
  }

  return {
    getSkill: getSkill,
    postSkill: postSkill
  };
});

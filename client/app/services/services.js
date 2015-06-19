angular.module('edify.services', [])

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.edify');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.edify');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
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

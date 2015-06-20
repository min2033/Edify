angular.module('edify.services', [])

.factory('Auth', function ($http, $location, $window) {
  var currentUser = null;

  var signin = function (user) {
    return $http({
      method: 'GET',
      url: '/auth/github'
    })
    .then(function (resp) {
      console.log(resp.data);
      currentUser = resp.data.user;
      // return resp.data.token;
    });
  };

// var signup = function (user) {
//   return $http({
//     method: 'POST',
//     url: '/api/users/signup',
//     data: user
//   })
//   .then(function (resp) {
//     console.log(resp.data);
//   });
// };

  var isAuth = function () {
    return !!currentUser;
  };

  var signout = function () {
    $location.path('/signin');
    currentUser = null;
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

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

  var getAllUsers = function(){
    return $http({
      method: 'GET',
      url: '/api/users/'
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
    putUser: putUser,
    getAllUsers: getAllUsers
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
.factory('Level', function() {

  var words = [
    'wat',
    'noob',
    'adventurer',
    'enthusiast',
    'practicioner',
    'master',
    'sorcerer'
  ];

  var toWord = function(index) {
    return words[index];
  }

  return {
    toWord: toWord,
    max: words.length - 1,
    min: 0
  };
})


//////////////////////////////////////////////////////////////////////////////////////////////
// Services for incomplete feature: UPVOTING OTHER USERS
//          use ONLY for building out this feature
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// Directive for displaying "stars" or total upvotes
//   the star is a thumbs-up emoji
//   restricted as an attribute but restriction may be changed to an element if desired
.directive('starRating', function () {
  return {
    restrict: 'A',
              // star is thumbs-up emoji
    template: '<span class="rating">' + '{{stars.length}}\uD83D\uDC4D'+'</span>',
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

//////////////////////////////////////////////////////////////////////////////////////////////
// Factory for handling server communication to poll the database for "likes" data
//   INCOMPLETE - lacks many support methods for parsing the data from the database
//                 we may also want to store the data from database locally here instead
//                 of repeatedly fetching, but if data is too large storing locally might
//                 not be feasible
.factory('Likes', function ($http) {

  var getLikeTeachers = function () {
    return $http({
      method: 'GET',
      url: '/api/likeTeachers'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  // var getLikeLearners = function () {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/likeLearners'
  //   });
  // };
  return {
    getLikeTeachers: getLikeTeachers
  };

})

//////////////////////////////////////////////////////////////////////////////////////////////
// Directive for upvote button. The button should only be clickable if the user
//   has not already upvoted for that person before.
//   INCOMPLETE - needs the above "Likes" factory built out to support this directive
//                preliminary code for upvoteUser method is in a testing state and much of it
//                should be moved into the "Likes" factory
.directive('upvote', function (Likes) {
  return {
    restrict: 'E',
    template: '<div><button type="button" class="btn btn-default btn-sm" ng-click="upvoteUser()">/{{actionStatus}}</button>{{message}}</div>',
    scope: {
      voter: '=',
      teacher: '=',
      learner: '=',
      skill: '='
    },
    link: function (scope, elem, attrs) {
      scope.message = "";
      scope.upvoted = false;
      scope.actionStatus = "Upvote";
      scope.voterLikes = {};


      scope.upvoteUser = function () {
        Likes.getLikeTeachers()
        .then(function(data) {
          console.log('request to Likes.getLikeTeachers');
          scope.voterLikes.teachers = data;
          console.log(scope.voterLikes.teachers);
        });

        // show me the vitals:
        console.log("voter id:", scope.voter.id);
        console.log("teacher id:", scope.teacher);
        console.log("learner id:", scope.learner);
        console.log("skill:", scope.skill);


        if (!scope.upvoted) {
          scope.upvoted = true;
          scope.message = "Thanks for your feedback!";
          scope.actionStatus = '\uD83D\uDC4D';
        }
      };

      scope.saveUpvote = function () {

      };
    }
  };
});

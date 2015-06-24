angular.module('edify',[
  'ui.router',
  'edify.services',
  'edify.user',
  'edify.allskills',
  'edify.main',
  'edify.skill'
  ])

.controller('AppController', function ($scope, Auth){
  $scope.isSignedIn = function () {
    return Auth.isAuth();
  };

  $scope.isSignedOut = function () {
    return !Auth.isAuth();
  }
})

.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'app/templates/main.html',
        controller:'MainController'
      })
      .state('signin',{
        url:'/signin',
        templateUrl: 'app/templates/signin.html'
      })
      .state('signout',{
        url:'/',
        controller: function(Auth){
          Auth.signOut();
        }
      })
      .state('user',{
        url:'/user/:username',
        templateUrl: 'app/templates/user.html',
        controller: 'UserController'
      })
      .state('allskills', {
        url: '/allskills',
        templateUrl: 'app/templates/allskills.html',
        controller: 'AllSkillsController'
      })
      .state('skill', {
        url: '/skill/:skillname',
        templateUrl: 'app/templates/skill.html',
        controller: 'SkillController'
      });
});

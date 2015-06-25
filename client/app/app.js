angular.module('edify',[
  'ui.router',
  'ui.bootstrap',
  'edify.services',
  'edify.user',
  'edify.allskills',
  'edify.main',
  'edify.skill',
  ])

.controller('AppController', function ($scope, Auth){
  $scope.isSignedIn = function () {
    return Auth.isAuth();
  };

  $scope.isSignedOut = function () {
    return !Auth.isAuth();
  };
})

.run(function ($rootScope, $state, Auth) {

  //restrict access to signed in users
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    //allow going to signin page
    var isSignin = toState.name === 'signin';

    //allow access signin page
    if (isSignin) {
      return;
    }

    //when trying to access other pages, redirect if not authenticated
    var isAuth = Auth.isAuth();
    if (!isAuth) {
      Auth.getUser()
        .success(function(data, status) {
          console.log('Logged in;', data);
          Auth.setUser(data);
        })
        .error(function(data, status) {
          console.log('ERROR:', status);
          event.preventDefault();
          $state.go('signin'); //redirect
        });      
    }
  
  });  
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
        templateUrl: 'app/templates/signin.html',
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

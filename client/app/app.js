angular.module('edify',[
  'ui.router',
  'edify.auth',
  'edify.services',
  'edify.user'
  //'edify.skills'
  ])
.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('signin',{
        url:'/signin',
        templateUrl: 'app/templates/signin.html',
        controller: 'AuthController'
      })
      .state('user',{
        url:'/user',
        templateUrl: 'app/templates/user.html',
        controller: 'UserController'
      });
});


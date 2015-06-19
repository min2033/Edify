angular.module('edify',[
  'ui.router',
  'edify.auth',
  'edify.services',
  'edify.users',
  'edify.skills'
  ])
.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('signin',{
        url:'/signin',
        templateUrl: 'app/templates/signin.html',
        controller: 'AuthController'
      })
      .state('users',{
        url:'/users',
        templateUrl: 'app/templates/user.html',
        controller: 'UsersController'
      });
});


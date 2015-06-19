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
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      });
});


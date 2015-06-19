angular.module('sporker',[
  'ui.router',
  'sporker.auth',
  'sporker.services',
  'sporker.users',
  'sporker.skills'
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
  
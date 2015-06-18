angular.module('sporker',[
  'ngRoute',
  'sporker.auth',
  'sporker.services'
  ])
  .config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    });
  });
angular.module('edify',[
  'ui.router',
  'edify.auth',
  'edify.services',
  'edify.user',
  'edify.allskills',
  'edify.main'
  // 'edify.skills'
  ])
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
        controller: 'AuthController'
      })
      .state('signout',{
        url:'/',
        controller: function(Auth){
          Auth.signOut();
        }
      })
      .state('user',{
        url:'/user',
        templateUrl: 'app/templates/user.html',
        controller: 'UserController'
      })
      .state('allskills', {
        url: '/allskills',
        templateUrl: 'app/templates/allskills.html',
        controller: 'AllSkillsController'
      });
});

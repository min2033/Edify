angular.module('edify',[
  'ui.router',
  'ui.bootstrap',
  'monospaced.elastic',
  'edify.modal',
  'edify.services',
  'edify.user',
  'edify.allskills',
  'edify.allusers',
  'edify.main',
  'edify.skill'
  // 'edify.location'
  ])

// add Location to enable location service
.controller('AppController', function ($scope, Auth){

  Auth.getUser()
    .success(function(data, status) {
      $scope.user = data;
    })
    .error(function(data, status) {
      console.log('ERROR:', status);
    });

  $scope.isSignedIn = function () {
    return Auth.isAuth();
  };

  $scope.isSignedOut = function () {
    return !Auth.isAuth();
  };

  // Test for Location service: see console for output
  // need to inject "edify.location" in the module, and "Location" in the function parameters
  // window.onGoogleReady = function () {
  //   Location.calculateZipDistance('94115', '92084', function ( result ) {
  //     console.log('distance is: ', result);
  //   })
  // }

})

.run(function ($rootScope, $state, Auth) {

  //restrict access to signed in users
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    //allow going to signin page
    // var isSignin = toState.name === 'signin'


    //allow access signin page
    if (toState.name === 'signin' || toState.name === 'about') {
      return;
    }

    //when trying to access other pages, redirect if not authenticated
    var isAuth = Auth.isAuth();
    if (!isAuth) {
      Auth.getUser()
        .success(function(data, status) {
          console.log('Logged in:', data);
          Auth.setUser(data);
          // $rootScope.user = data;
          // console.log($rootScope.user);
        })
        .error(function(data, status) {
          console.log('ERROR:', status);
          event.preventDefault();
          $state.go('signin'); //redirect
        });
      return;
    }

    //if user clicks on their own profile, take them to the profile page
    if (isAuth && (toState.name === 'user') && (toParams.username === Auth.user().username)) {
      event.preventDefault();
      $state.go('home');
      return;
    }

  });
})

.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/templates/about.html'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/main.html',
        controller:'MainController'
      })
      .state('signin', {
        url:'/signin',
        templateUrl: 'app/templates/signin.html',
      })
      .state('signout', {
        url:'/',
        controller: function(Auth) {
          Auth.signOut();
        }
      })
      .state('user', {
        url:'/user/:username',
        templateUrl: 'app/templates/user.html',
        controller: 'UserController'
      })
      .state('allskills', {
        url: '/skills',
        templateUrl: 'app/templates/allskills.html',
        controller: 'AllSkillsController'
      })
      .state('allusers', {
        url: '/users',
        templateUrl: 'app/templates/allusers.html',
        controller: 'AllUsersController'
      })
      .state('skill', {
        url: '/skill/:skillname',
        templateUrl: 'app/templates/skill.html',
        controller: 'SkillController'
      });
});

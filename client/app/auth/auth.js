angular.module('sporker.auth', [])

.controller('AuthController', function ($rootScope, $scope, $window, $location, Auth) {
  $scope.user = {};
  if($location.$$path === '/signout'){
    Auth.signout();
    $rootScope.$broadcast('authChange',Auth.isAuth());
  }

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.sporker', token);
        $location.path('/links');
        $rootScope.$broadcast('authChange',Auth.isAuth());
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.sporker', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
angular.module('edify.main', [])

.controller('MainController', function($scope, Auth) {
  $scope.user;

  $scope.getProfile = function () {
    if(Auth.isAuth()){
      $scope.user = Auth.user;
    }else{
      Auth.getUser()
        .then(function(data){
          $scope.user = data.data;
      });
    }
  };

  $scope.getProfile();

});

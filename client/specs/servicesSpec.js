"use strict";

describe('Services', function () {
  var Users, $http;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('edify'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    // $rootScope = $injector.get('$rootScope');
    // $httpBackend = $injector.get('$httpBackend');
    $http = $injector.get('$http');
    Users = $injector.get('Users');
    $scope = $rootScope.$new();

    var $factory = $injector.get('$factory');

    createService = function () {
      return $factory('Users', {
        $http: $http
      });
    };
  }));

  it('should have a getUser function', function() {
    createService();
    expect(getUser).to.be.an('function');
  });

  // it('should have a getLinks method on the $scope', function () {
  //   createController();
  //   expect($scope.getLinks).to.be.a('function');
  // });
  // it('should call getLinks() when controller is loaded', function () {
  //   var mockLinks = [{},{},{}];
  //   $httpBackend.expectGET("/api/links").respond(mockLinks);
  //   createController();
  //   $httpBackend.flush();
  //   expect($scope.data.links).to.eql(mockLinks);
  // });
});
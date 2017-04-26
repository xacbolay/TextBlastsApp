angular.module('starter.controllers', ['ngStorage'])
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//  Login Controller
.controller('AuthController', function($scope, $rootScope, $stateParams, $http, $localStorage) {
  $scope.user = {};
  $scope.loading = false;

  $scope.signIn = function() {
    this.apiUrl = '';
    $scope.loading = true;
    $http.post(this.apiUrl + '/login', $scope.user).then(
      function success(response) {
        // body...
        $localStorage.settings.user = response.user;
        $stateParams.go('contacts');
      },
      function fail(response) {
        // body...
        $scope.loading = false;
      }                                              
    );
  };
  $rootScope.logOut = function() {
    $localStorage.settings.user = null;
    $stateParams.go('login');
  };
})

.controller('ContactsController', function($scope, $filter, $ionicSideMenuDelegate) {
  $scope.contacts = [
    {name: 'david'}, 
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'}
  ];
  $scope.searchData = '';
  $scope.orderByType;

  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.findByName = function() {
    // body...
  };
  $scope.findByPhone = function() {
    // body...
  };
  $scope.orderByRating = function() {
    $filter('orderBy')($scope.contacts, 'name');
  };
  $scope.orderByGender = function() {
    $filter('orderBy')($scope.contacts, 'gender');
  };
  $scope.orderByAge = function() {
    $filter('orderBy')($scope.contacts, 'age');
  };

});

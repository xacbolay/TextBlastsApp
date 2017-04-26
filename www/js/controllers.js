angular.module('starter.controllers', ['ngStorage'])
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//  Login Controller
.controller('AuthController', function($scope, $rootScope, $state, $http, $localStorage, AuthService) {
  AuthService.authorize();
  $scope.user = {};
  $scope.loading = false;

  $scope.signIn = function() {
    this.apiUrl = '';
    $scope.loading = true;
    $http.post(this.apiUrl + '/login', $scope.user).then(
      function success(response) {
        $localStorage.settings.user = response.user;
        // User token for API middleware.
        AuthService.header('token', $localStorage.settings.user.token);
        $state.go('contacts');
      },
      function fail(response) {
        // body...
        $scope.loading = false;
      }                                              
    );
  };
  $rootScope.logOut = function() {
    $localStorage.settings.user = null;
    $state.go('login');
  };
})

.controller('ContactsController', function($scope, $filter, $ionicSideMenuDelegate, $ionicHistory, AuthService) {
  AuthService.authorize();
  $scope.contacts = [
    {name: 'david'}, 
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'},
    {name: 'david'}
  ];
  $scope.contact = {};
  $scope.searchData = null;
  $scope.searchResult = [];
  $scope.orderByType;

  $scope.sendMessage = function() {
    // body
  };
  $scope.fetchContacts = function() {
    // body...
  };
  $scope.redirectBack = function() {
    $ionicHistory.goBack();
  };
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  this.findBy = function() {
    if (typeof $scope.searchData == 'string' && $scope.searchData.length) {

    } else if (typeof $scope.searchData == 'string') {
      this.findByName();
    } else if (typeof $scope.searchData == 'number') {
      this.findByPhone();
    }
  };
  this.findByName = function() {
    $scope.searchResult = $scope.contacts.filter(function(contact) {
      return contact.name.search($scope.searchData);
    });
  };
  this.findByPhone = function() {
    $scope.searchResult = $scope.contacts.filter(function(contact) {
      return contact.phone == $scope.searchData;
    });
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

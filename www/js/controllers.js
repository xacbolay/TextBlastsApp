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
  //AuthService.authorize();
  $scope.contacts = [
    {name: 'david', phone: 12345, age: 18, gender: 'female', rating: 10}, 
    {name: 'victor', phone: 12345, age: 21, gender: 'male', rating: 5},
    {name: 'david miranda', phone: 12345, age: 24, gender: 'female', rating: 1},
    {name: 'david', phone: 12333, age: 22, gender: 'male', rating: 5},
    {name: 'david alexader', phone: 12345, age: 24, gender: 'female', rating: 10},
    {name: 'alexander david', phone: 22222, age: 24, gender: 'male', rating: 10},
    {name: 'david', phone: 12345, age: 28, gender: 'female', rating: 2}
  ];
  $scope.contact = {};
  $scope.searchData = null;
  $scope.searchResult = [];
  $scope.orderByType = null;

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
  $scope.findBy = function() {
    if (isNaN($scope.searchData)) {
      findByName();
    } else {
      findByPhone();
    }
  };
  var findByName = function() {
    $scope.searchResult = $scope.contacts.filter(function(contact) {
      return contact.name.includes($scope.searchData);
    });
  };
  var findByPhone = function() {
    $scope.searchResult = $scope.contacts.filter(function(contact) {
      return contact.phone == $scope.searchData;
    });
  };
  $scope.orderBy = function() {
    if ($scope.orderByType.includes('Age')) {
      console.log('age');
      orderByAge();
    } else if ($scope.orderByType.includes('Gender')) {
      console.log('gender');
      orderByGender();
    } else if ($scope.orderByType.includes('Rating')) {
      console.log('rating');
      orderByRating();
    }
  };
  var orderByRating = function() {
    $filter('orderBy')($scope.contacts, 'name');
  };
  var orderByGender = function() {
    $filter('orderBy')($scope.contacts, 'gender');
  };
  var orderByAge = function() {
    $filter('orderBy')($scope.contacts, 'age');
  };

});

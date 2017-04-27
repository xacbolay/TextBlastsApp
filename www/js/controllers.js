angular.module('starter.controllers', ['ngStorage'])
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//  Login Controller
.controller('AuthController', function($scope, $rootScope, $ionicHistory, $state, $http, $localStorage, AuthService) {
  AuthService.authorize();
  $scope.login = {};
  $scope.loading = false;

  $scope.signIn = function() {
    $scope.loading = true;
    $http.post($rootScope.apiUrl + '/login', $scope.login).then(
      function success(response) {
        console.log(response);
        $localStorage.settings = {user: response.data};
        AuthService.setUser($localStorage.settings.user);
        AuthService.header('token', AuthService.user().AppToken);
        $state.go('contacts');
      },
      function fail(response) {
        // body...
        console.log(response);
        $scope.loading = false;
      }                                              
    );
  };
  $scope.logOut = function() {
    $localStorage.settings = null;
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();    
    $state.go('login');
  };
})

.controller('ContactsController', function($scope, $rootScope, $filter, $ionicSideMenuDelegate, $state, AuthService) {
  AuthService.authorize();
  $scope.contacts = AuthService.user().phoneList;
  $scope.contact = {};
  $scope.searchData = null;
  $scope.searchResult = [];
  $scope.orderByTypes = [
    {value: 'name', tag: 'Name'},
    {value: 'age', tag: 'Age'},
    {value: 'gender', tag: 'Gender'},
    {value: 'rating', tag: 'Rating'},
  ];
  $scope.orderByType = null;

  $scope.redirectBack = function() {
    $state.go('contacts');
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
  $scope.orderBy = function(orderByType) {
    switch (orderByType) {
      case 'name':
        $filter('orderBy')($scope.contacts, 'name');
        break;
      case 'age':
        $filter('orderBy')($scope.contacts, 'age');
        break;
      case 'gender':
        $filter('orderBy')($scope.contacts, 'gender');
        break;
      case 'rating':
        $filter('orderBy')($scope.contacts, 'rating');
        break;
    }
  };

})

.controller('ContactDetailController', function($scope, $state, $stateParams, $ionicHistory, AuthService) {
  //$ionicSideMenuDelegate.toggleLeft();
  AuthService.authorize();
  $scope.contact = AuthService.user().phoneList.filter(function(contact) {
    return contact.client_id == $stateParams.contactId;
  });
  console.log($scope.contact);
  $scope.message = {};
  $scope.shortlink = null;
  $scope.loading = false;

  $scope.sendMessage = function() {
    // body...
  };
  $scope.redirectBack = function() {
    $state.go('contacts');
  };
})

.controller('ContactAddController', function($scope, $state, $ionicHistory, AuthService) {
  AuthService.authorize();
  $scope.contact = {};
  $scope.loading = false;

  $scope.addContact = function() {
    // body...
  };
  $scope.redirectBack = function() {
    $state.go('contacts');
  };
})

.controller('VenueController', function($scope, $state, $ionicHistory, AuthService) {
  AuthService.authorize();
  $scope.venue = {};
  $scope.loading = false;

  $scope.changeVenue = function() {
    // body...
  };
  $scope.redirectBack = function() {
    $state.go('contacts');
  };
})

.controller('QuickMessageController', function($scope, $state, $ionicHistory, AuthService) {
  //$ionicSideMenuDelegate.toggleLeft();
  AuthService.authorize();
  $scope.message = {};
  $scope.venue = {};
  $scope.shortlink = null;
  $scope.loading = false;

  $scope.sendMessage = function() {
    // body...
  };
  $scope.redirectBack = function() {
    $state.go('contacts');
  };
});

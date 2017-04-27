angular.module('starter.controllers', ['ngStorage'])
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//  Login Controller
.controller('AuthController', function($scope, $rootScope, $ionicHistory, $http, $localStorage, AuthService) {
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
        AuthService.redirect('contacts');
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
    AuthService.redirect('contacts');
  };
})

.controller('ContactsController', function($scope, $rootScope, $filter, $ionicSideMenuDelegate, AuthService) {
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

.controller('ContactDetailController', function($scope, $rootScope, $stateParams, AuthService) {
  AuthService.authorize();
  $scope.contact = AuthService.user().phoneList.find(function(contact) {
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
    AuthService.redirect('contacts');
  };
})

.controller('ContactAddController', function($scope, $rootScope, $http, AuthService) {
  AuthService.authorize();
  $scope.contact = {};
  $scope.loading = false;

  $scope.addContact = function() {
    $scope.loading = true; 
    $http.post($rootScope.apiUrl + '/savephone', $scope.contact).then(
      function success(response) {
        $scope.loading = false; 
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $scope.loading = false;
      }
    );
  };
  $scope.redirectBack = function() {
    AuthService.redirect('contacts');
  };
})

.controller('VenueController', function($scope, $rootScope, $http, AuthService) {
  AuthService.authorize();
  $scope.venue = AuthService.user().client_data[0];
  $scope.loading = false;

  $scope.changeVenue = function() {
    $scope.loading = true;
    $http.post($rootScope.apiUrl + '/getlist', data).then(
      function success(response) {
        $scope.loading = false; 
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $scope.loading = false;
      }
    );
  };
  $scope.redirectBack = function() {
    AuthService.redirect('contacts');
  };
})

.controller('QuickMessageController', function($scope, $rootScope, $http, AuthService) {
  AuthService.authorize();
  $scope.message = {};
  $scope.shortlink = null;
  $scope.loading = false;

  $scope.sendMessage = function() {
    $scope.loading = true;
    $scope.message.body += "" + $scope.shortlink;
    $scope.message.client_id = AuthService.user().client_data[0].client_id;
    $http.post($rootScope.apiUrl + '/sendsms', $scope.message).then(
      function success(response) {
        $scope.loading = false; 
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $scope.loading = false;
      }
    );
  };
  $scope.redirectBack = function() {
    AuthService.redirect('contacts');
  };
});

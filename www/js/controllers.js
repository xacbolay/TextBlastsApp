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
  console.log('AuthController');
  $scope.login = {};
  $scope.loading = false;

  $scope.signIn = function() {
    $scope.loading = true;
    $http.post($rootScope.apiUrl + '/login', $scope.login).then(
      function success(response) {
        console.log(response);
        $localStorage.settings = {user: response.data};
        AuthService.setUser($localStorage.settings.user);
        AuthService.header('X-Authorization', AuthService.user().AppToken);
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
    AuthService.redirect('login');
  };
})

.controller('ContactsController', function($scope, $rootScope, $filter, $ionicSideMenuDelegate, AuthService) {
  AuthService.authorize();
  console.log('ContactsController');
  $scope.contacts = AuthService.user().phoneList;
  $scope.searchData = null;
  $scope.searchResult = [];
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
        console.log('name');
        break;
      case 'age':
        $filter('orderBy')($scope.contacts, 'age');
        console.log('age');
        break;
      case 'gender':
        $filter('orderBy')($scope.contacts, 'gender');
        console.log('gender');
        break;
      case 'rating':
        $filter('orderBy')($scope.contacts, 'rating');
        console.log('rating');
        break;
    }
  };
})

.controller('ContactDetailController', function($scope, $http, $rootScope, $stateParams, AuthService) {
  AuthService.authorize();
  console.log('ContactDetailController');
  $scope.contact = AuthService.user().phoneList.find(function(contact) {
    return contact.id == $stateParams.contactId;
  });
  $scope.message = {};
  $scope.shortlink = null;
  $scope.loading = false;

  $scope.setShortlink = function(shortlink) {
    $scope.shortlink = shortlink;
  };
  $scope.sendMessage = function() {
    $scope.loading = true;
    if ($scope.shortlink) $scope.message.body += "" + $scope.shortlink;
    $scope.message.client_id = AuthService.user().main_client_data.id;
    $scope.message.phone = $scope.contact.phone;
    console.log($scope.shortlink);
    console.log($scope.message);
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
})

.controller('ContactAddController', function($scope, $rootScope, $http, AuthService, $localStorage) {
  AuthService.authorize();
  console.log('ContactAddController');
  $scope.contact = {};
  $scope.loading = false;

  $scope.addContact = function() {
    $scope.loading = true; 
    $scope.contact.client_id = AuthService.user().main_client_data.id;
    console.log($scope.contact);
    $http.post($rootScope.apiUrl + '/savephone', $scope.contact).then(
      function success(response) {
        $scope.loading = false;
        $localStorage.settings.user.phoneList.push($scope.contact);
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

.controller('VenueController', function($scope, $rootScope, $http, $localStorage, AuthService) {
  AuthService.authorize();
  console.log('VenueController');
  $scope.venue = AuthService.user().main_client_data;
  $scope.clientId = null;
  $scope.loading = false;

  $scope.setClientId = function(clientId) {
    $scope.clientId = clientId;
  };
  $scope.changeVenue = function() {
    $scope.loading = true;
    $scope.venue.client_id = $scope.clientId;
    console.log($scope.venue);
    $http.post($rootScope.apiUrl + '/getlist', $scope.venue).then(
      function success(response) {
        var AppToken = AuthService.user().AppToken;
        $localStorage.settings = {user: response.data};
        $localStorage.settings.user.AppToken = AppToken;
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
  console.log('QuickMessageController');
  $scope.message = {};
  $scope.shortlink = null;
  $scope.loading = false;

  $scope.setShortlink = function(shortlink) {
    $scope.shortlink = shortlink;
  };
  $scope.sendMessage = function() {
    $scope.loading = true;
    if ($scope.shortlink) $scope.message.body += "" + $scope.shortlink;
    $scope.message.client_id = AuthService.user().main_client_data.id;
    console.log($scope.shortlink);
    console.log($scope.message);
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

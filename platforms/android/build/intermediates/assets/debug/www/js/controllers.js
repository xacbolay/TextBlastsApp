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
  console.log($localStorage);
  $rootScope.login = {};
  $rootScope.loading = false;
  $rootScope.errors = null;

  $scope.signIn = function() {
    $rootScope.loading = true;
    $http.post($rootScope.apiUrl + '/login', $rootScope.login).then(
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
        $rootScope.errors = response.data;
        $rootScope.loading = false;
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
  $rootScope.errors = null;
  $rootScope.loading = false;

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
      return contact.name.toLowerCase().includes($scope.searchData.toLowerCase());
    });
  };
  var findByPhone = function() {
    $scope.searchResult = $scope.contacts.filter(function(contact) {
      return contact.phone == $scope.searchData;
    });
  };
  $scope.orderBy = function(orderByType) {
    console.log('orderByType: ' + orderByType);
    switch (orderByType) {
      case 'name':
       $scope.contacts = $filter('orderBy')($scope.contacts, 'name');
        break;
      case 'age':
        $scope.contacts = $filter('orderBy')($scope.contacts, 'age');
        break;
      case 'gender':
        $scope.contacts = $filter('orderBy')($scope.contacts, 'gender');
        break;
      case 'rating':
        $scope.contacts = $filter('orderBy')($scope.contacts, 'rating');
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
  console.log($scope.contact);
  $scope.message = {};
  $scope.shortlink = null;
  $rootScope.loading = false;
  $rootScope.errors = null;

  $scope.setShortlink = function(shortlink) {
    $scope.shortlink = shortlink;
  };
  $scope.sendMessage = function() {
    $rootScope.loading = true;
    if ($scope.shortlink) $scope.message.body += "\n" + $scope.shortlink;
    $scope.message.client_id = AuthService.user().main_client_data.id;
    $scope.message.phone = $scope.contact.phone;
    console.log($scope.shortlink);
    console.log($scope.message);
    $http.post($rootScope.apiUrl + '/sendsms', $scope.message).then(
      function success(response) {
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $rootScope.loading = false;
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
  $rootScope.loading = false;
  $rootScope.errors = null;

  $scope.addContact = function() {
    $rootScope.loading = true; 
    $scope.contact.client_id = AuthService.user().main_client_data.id;
    console.log($scope.contact);
    $http.post($rootScope.apiUrl + '/savephone', $scope.contact).then(
      function success(response) {
        $localStorage.settings.user.phoneList.push($scope.contact);
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $rootScope.loading = false;
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
  $rootScope.loading = false;
  $rootScope.errors = null;

  $scope.setClientId = function(clientId) {
    $scope.clientId = clientId;
  };
  $scope.changeVenue = function() {
    $rootScope.loading = true;
    $scope.venue.client_id = $scope.clientId;
    console.log($scope.venue);
    $http.post($rootScope.apiUrl + '/getlist', $scope.venue).then(
      function success(response) {
        console.log(response);
        $localStorage.settings = {user: response.data};
        AuthService.setUser($localStorage.settings.user);
        AuthService.header('X-Authorization', AuthService.user().AppToken);
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $rootScope.loading = false;
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
  $rootScope.loading = false;
  $rootScope.errors = null;

  $scope.setShortlink = function(shortlink) {
    $scope.shortlink = shortlink;
  };
  $scope.sendMessage = function() {
    $rootScope.loading = true;
    if ($scope.shortlink) $scope.message.body += "\n" + $scope.shortlink;
    $scope.message.client_id = AuthService.user().main_client_data.id;
    console.log($scope.shortlink);
    console.log($scope.message);
    $http.post($rootScope.apiUrl + '/sendsms', $scope.message).then(
      function success(response) {
        AuthService.redirect('contacts');
      },
      function fail(response) {
        $rootScope.loading = false;
      }
    );
  };
  $scope.redirectBack = function() {
    AuthService.redirect('contacts');
  };
});

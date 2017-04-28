// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services',
  'ngStorage'
])

.run(function($ionicPlatform, $http, $localStorage, $rootScope, AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Set user token for all http requests and global scope model user.
    if ($localStorage.settings) {
      $http.defaults.headers.common['X-Authorization'] = $localStorage.settings.user.AppToken;
      console.log('token: ' + $localStorage.settings.user.AppToken);
      AuthService.setUser($localStorage.settings.user);
    }

    $rootScope.apiUrl = '//2night.net/api/v1/tb';
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // Global http interceptor User token for API middleware response.
  //$httpProvider.interceptors.push('tokenInterceptor');
  
  $ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  // States manager.
  $stateProvider

  .state('contacts', {
    url: '/',
    templateUrl: 'templates/contacts.html',
    controller: 'ContactsController'
  })

  .state('contacts-add', {
    url: '/contacts/add',
    templateUrl: 'templates/contact-add.html',
    controller: 'ContactAddController'
  })

  .state('contacts-detail', {
    url: '/contacts/:contactId',
    templateUrl: 'templates/contact-detail.html',
    controller: 'ContactDetailController'
  })

  .state('venue', {
    url: '/venue',
    templateUrl: 'templates/venue.html',
    controller: 'VenueController'
  })

  .state('quick-message', {
    url: '/quickmessage',
    templateUrl: 'templates/quick-message.html',
    controller: 'QuickMessageController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthController'
  })

  /**
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  **/

});

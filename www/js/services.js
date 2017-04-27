angular.module('starter.services', ['ngStorage'])

.factory('AuthService', function($localStorage, $state, $http, $rootScope) {
  this.authorize = function() {
    if ($state.is('login')) {
      if ($localStorage.settings) $state.go('contacts');
    } else {
      if (!$localStorage.settings) $state.go('login');
    }
  };
  this.header = function(name, value) {
    $http.defaults.headers.common[name] = value;
  };
  this.user = function() {
    return $rootScope.user;
  };
  this.setUser = function(data) {
    $rootScope.user = data;
  };
  this.redirect = function(name, params) {
    $state.go(name, params);
  };

  return {
    authorize: this.authorize,
    header: this.header,
    user: this.user,
    setUser: this.setUser,
    redirect: this.redirect
  };
})

.factory('tokenInterceptor', function ($q) {
  return {
    response: function (response) {
      // do something on success
      if(response.headers()['token'] === "false"){
        // Validate response, if not ok reject
        // FORCE LOGOUT

        if(!data) return $q.reject(response);
      }
      // Return the response or promise.
      return response || $q.when(response);
    },
    responseError: function (response) {
      // do something on error
      
      // Return the promise rejection.
      return $q.reject(response);
    }
  };
});

/**
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
**/

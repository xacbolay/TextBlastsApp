angular.module('starter.services', ['ngStorage'])

.factory('AuthService', function($localStorage, $state, $http) {
  this.authorize = function() {
    if ($state.is('login')) {
      if ($localStorage.settings) $state.go('/');
    } else {
      if (!$localStorage.settings) $state.go('login');
    }
  };
  this.header = function(name, value) {
    $http.defaults.headers.common[name] = value;
  };

  return {
    authorize: this.authorize
  };
})

.factory('tokenInterceptor', function ($q) {
  return {
    response: function (response) {
      // do something on success
      if(response.headers()['content-type'] === "application/json; charset=utf-8"){
        // Validate response, if not ok reject
        var data = examineJSONResponse(response); // assumes this function is available

        if(!data)
          return $q.reject(response);
        }
        return response;
    },
    responseError: function (response) {
      // do something on error
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

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
      if (response.headers()['token'] === "false"){
        // Validate response, if not ok reject
        // 
        // FORCE LOGOUT

        if (!data) return $q.reject(response);
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

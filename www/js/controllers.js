angular.module('starter.controllers', ['ngStorage'])

//  Login Controller
.controller('LoginController', function($scope, $stateParams, $http, $localStorage) {
  $scope.user = {};
  $scope.loading = false;

  $scope.login = function() {
    this.apiUrl = '';
    $scope.loading = true;
    $http.post(this.apiUrl + '/login', $scope.user).then(
      function success(response) {
        // body...
        $localStorage.settings.user = response.user;
        $stateParams.go('home');
      },
      function fail(response) {
        // body...
        $scope.loading = false;
      }                                              
    );
  };
})

.controller('ContactsController', function($scope) {
  $scope.contacts = [];
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

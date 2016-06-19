angular.module('myNewProjectApp')
  .controller('LoginCtrl', function (Spotify, $scope, $state) {
  	var userId;
  	$scope.login = function(){
  		Spotify.login().then(function (token) {
        Spotify.setAuthToken(token);
        Spotify.getCurrentUser()
  		.then(function(foundUser){
  			return foundUser.id;
  		})
  		.then(function(userId){
  			console.log(userId)
  			localStorage.setItem('user-id', userId)
        $state.go('home')
  		})
      }, function () {
        console.log('didn\'t log in');
      })
  	}

  });
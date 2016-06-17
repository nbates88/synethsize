'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MainCtrl', function (Spotify, $scope) {
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
  			Spotify.getUserPlaylists(userId)
  			.then(function (playlists) {
  				$scope.playlists = playlists.items
  				console.log("playlists", $scope.playlists)
			});
  		})
      }, function () {
        console.log('didn\'t log in');
      })
  	}

  	
  	
  	
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
  });

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
  				$scope.chunkedPlaylists = chunk($scope.playlists, 3);
  				console.log("playlists", $scope.chunkedPlaylists)
			});
  		})
      }, function () {
        console.log('didn\'t log in');
      })
  	}

  	function chunk(arr, size) {
	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}
	


  	
  	
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
  });

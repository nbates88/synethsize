'use strict';


angular.module('myNewProjectApp')
  .controller('PlaylistCtrl', function (Spotify, $scope, $stateParams, $sce) {
    var playlistId = $stateParams.playlistId;
    var userId = localStorage.getItem('user-id');

  Spotify.getPlaylist(userId, playlistId)
	  .then(function (foundPlaylist) {
	    $scope.playlist = foundPlaylist;
	    console.log($scope.playlist);
	    $scope.playlistSongs = foundPlaylist.tracks.items;
	    console.log($scope.playlistSongs);
	  });

	$scope.playSong = function(songUrl, songId){
		console.log(songId)
		$scope.src = $sce.trustAsResourceUrl(songUrl);
		
		Spotify.getTrackAudioFeatures(songId)
		.then(function (data) {
  			console.log(data);
		});
	};
    
  });

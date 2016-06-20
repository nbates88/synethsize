'use strict';


angular.module('myNewProjectApp')
  .controller('PlaylistCtrl', function (Spotify, $scope, $stateParams, $sce, $state) {
  	$scope.Model = $scope.Model || {Name : "xxx"};
    var playlistId = $stateParams.playlistId;
    var playlistUser = $stateParams.playlistUser
    var userId = localStorage.getItem('user-id');
    var songColor;
    $scope.score = 0;
 
  Spotify.getPlaylist(playlistUser, playlistId)
	  .then(function (foundPlaylist) {
	    $scope.playlist = foundPlaylist;
	    console.log($scope.playlist);
	    $scope.playlistSongs = foundPlaylist.tracks.items;
	    console.log($scope.playlistSongs);
	  });

	$scope.playSong = function(song, songUrl, songId){
		var idx = $scope.playlistSongs.indexOf(song)
		console.log(song)
		var h;
		var s;
		var v;
		$scope.dynamicClass = "";
		$scope.feedback = "Make a guess!";
		$scope.src = $sce.trustAsResourceUrl(songUrl);

		Spotify.getTrackAudioFeatures(songId)
		.then(function (audioFeatures) {
			console.log("AUDIO", audioFeatures)
  			var key = audioFeatures.key / 11;
  			var valence = audioFeatures.valence;
  			var energy = audioFeatures.energy;
  			var danceability = audioFeatures.danceability;
  			var loudness =  Math.abs(audioFeatures.loudness / 60);
  			var acousticness =  audioFeatures.acousticness;
  			var mode = audioFeatures.mode 
  			var tempo = audioFeatures.tempo / 250

  			var veAverage = (valence + energy) / 2
  			h =key
  			s = (loudness + energy) / 2;
  			v = (valence + danceability + tempo) / 3 
  			// Math.abs(audioFeatures.loudness * 0.066);
  			console.log(h)
  			console.log(s)
  			console.log(v)
  			var color = hsvToRgb(h,s,v);
  			songColor = color[0] + "," + color[1] + "," + color[2];
  			var randomColor1 = randomColor();
  			var randomColor2 = randomColor();
  			var randomColor3 = randomColor();

  			var colorArray = [];
  			colorArray.push(songColor);
  			colorArray.push(randomColor1);
  			colorArray.push(randomColor2);
  			colorArray.push(randomColor3);
  			colorArray.sort(function() { return 0.5 - Math.random() });
  			console.log(colorArray);
  			
  			$scope.songColorOne = colorArray[0];
  			$scope.songColorTwo = colorArray[1];
  			$scope.songColorThree = colorArray[2];
  			$scope.songColorFour = colorArray[3];	

  			var wrongAnswer = 0;

  			$scope.chosenColor = function(colorValues){
			if(colorValues === songColor){
				$scope.feedback = "You are correct!";
				$scope.score = $scope.score + 1;
				if(idx === $scope.playlistSongs.length - 1){
					window.alert("Nice job! You scored: " + $scope.score);
				} else{
					setTimeout(myFunction, 1000);
					function myFunction() {
						var nextSong = $scope.playlistSongs[idx + 1]
						$scope.playSong(nextSong, nextSong.track.preview_url, nextSong.track.id)
					}
					// var nextSong = $scope.playlistSongs[idx + 1]
					// $scope.playSong(nextSong, nextSong.track.preview_url, nextSong.track.id)
				}
				

			} else{
				$scope.feedback = "Sorry, that's incorrect";
				wrongAnswer++
				if(wrongAnswer > 1){
					$scope.feedback = "Sorry, you've run out of guesses for this song!"
					$scope.dynamicClass = "is-disabled";

						if(idx === $scope.playlistSongs.length - 1){
							window.alert("Nice job! You scored: " + $scope.score);
						} else{
							setTimeout(myFunction, 1000);
							function myFunction() {
								var nextSong = $scope.playlistSongs[idx + 1]
								$scope.playSong(nextSong, nextSong.track.preview_url, nextSong.track.id)
							}
							// var nextSong = $scope.playlistSongs[idx + 1]
							// $scope.playSong(nextSong, nextSong.track.preview_url, nextSong.track.id)
						}


					// setTimeout(myFunction, 1000);
					// function myFunction() {
					// 	var nextSong = $scope.playlistSongs[idx + 1]
					// 	$scope.playSong(nextSong, nextSong.track.preview_url, nextSong.track.id)
					// }
					
				}
				}
			}
		});
	};


	function hsvToRgb(h, s, v) {
	  var r, g, b;

	  var i = Math.floor(h * 6);
	  var f = h * 6 - i;
	  var p = v * (1 - s);
	  var q = v * (1 - f * s);
	  var t = v * (1 - (1 - f) * s);

	  switch (i % 6) {
	    case 0: r = v, g = t, b = p; break;
	    case 1: r = q, g = v, b = p; break;
	    case 2: r = p, g = v, b = t; break;
	    case 3: r = p, g = q, b = v; break;
	    case 4: r = t, g = p, b = v; break;
	    case 5: r = v, g = p, b = q; break;
	  }

	  return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];	 
	}

	var rand = function() {
	    return Math.floor(Math.random() * 256);
	};
	var randomColor = function() {
	    var r = rand();
	    var g = rand();
	    var b = rand();
	    return r+","+g+","+b;
	};
});
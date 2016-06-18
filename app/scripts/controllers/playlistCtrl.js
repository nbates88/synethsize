'use strict';


angular.module('myNewProjectApp')
  .controller('PlaylistCtrl', function (Spotify, $scope, $stateParams, $sce) {
    var playlistId = $stateParams.playlistId;
    var playlistUser = $stateParams.playlistUser
    var userId = localStorage.getItem('user-id');
    var songColor;

  Spotify.getPlaylist(playlistUser, playlistId)
	  .then(function (foundPlaylist) {
	    $scope.playlist = foundPlaylist;
	    console.log($scope.playlist);
	    $scope.playlistSongs = foundPlaylist.tracks.items;
	    console.log($scope.playlistSongs);
	  });


	$scope.playSong = function(songUrl, songId){
		var h;
		var s;
		var v;
		$scope.feedback = "";
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
  			h = 1 - ((key + valence + energy + loudness + danceability + mode) / 6);
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
		});
	};

	$scope.chosenColor = function(colorValues){
		console.log(colorValues);
		console.log(songColor);
		if(colorValues === songColor){
			$scope.feedback = "You are correct!";
			console.log("YOU WIN!!!!!!");
		} else{
			$scope.feedback = "Sorry, that's incorrect";
			console.log("Wrong");
		}
	}



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

	// function HSVtoRGB(h, s, v) {
	//     var r, g, b, i, f, p, q, t;
	//     if (arguments.length === 1) {
	//         s = h.s, v = h.v, h = h.h;
	//     }
	//     i = Math.floor(h * 6);
	//     f = h * 6 - i;
	//     p = v * (1 - s);
	//     q = v * (1 - f * s);
	//     t = v * (1 - (1 - f) * s);
	//     switch (i % 6) {
	//         case 0: r = v, g = t, b = p; break;
	//         case 1: r = q, g = v, b = p; break;
	//         case 2: r = p, g = v, b = t; break;
	//         case 3: r = p, g = q, b = v; break;
	//         case 4: r = t, g = p, b = v; break;
	//         case 5: r = v, g = p, b = q; break;
	//     }
	//     return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];	
	// }

	
		// var safeColors = ['00','33','66','99','cc','ff'];
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

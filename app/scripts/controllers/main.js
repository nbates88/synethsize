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
    userId = localStorage.getItem('user-id')
      Spotify.getUserPlaylists(userId)
        .then(function (playlists) {
          $scope.playlists = playlists.items
        });

  });

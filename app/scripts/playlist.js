'use strict';

angular.config(function ($stateProvider) {

  $stateProvider.state('playlist', {
    url: '/playlist',
    templateUrl: '/views/playlist.html'
    // controller: 'Ctrl',
    // resolve: {
    //   allArtists: function (ArtistFactory) {
    //     return ArtistFactory.fetchAll();
    //   }
    });
  });
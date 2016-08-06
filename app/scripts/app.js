'use strict';

/**
 * @ngdoc overview
 * @name myNewProjectApp
 * @description
 * # myNewProjectApp
 *
 * Main module of the application.
 */
angular
  .module('myNewProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'spotify',
    'ui.router',
    'angular.filter'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/playlist/:playlistUser/:playlistId', '/playlist/:playlistUser/:playlistId/song');
    $stateProvider
     .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url:'/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('callback', {
        url: '/callback',
        templateUrl: 'views/callback.html',
        // controller: 'AboutCtrl',
        // controllerAs: 'about'
      })
      .state('playlist', {
        url: '/playlist/:playlistUser/:playlistId',
        views: {
          '': { templateUrl: 'views/game.html', controller: 'PlaylistCtrl'},
          'playlistView@playlist': { templateUrl: 'views/playlist.html' },
          'songView@playlist': { templateUrl: 'views/playlist.song.html' } 
        }
      });
      //  .state('playlist.song', {
      //   url: '/song',
        
      // });
      // .otherwise({
      //   redirectTo: '/'
      // });
  })
  .config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('XXXXX');
  SpotifyProvider.setRedirectUri('http://localhost:9000/#/callback');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
  // SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
});

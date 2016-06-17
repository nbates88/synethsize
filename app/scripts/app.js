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
    'spotify'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/callback', {
        templateUrl: 'views/callback.html',
        // controller: 'AboutCtrl',
        // controllerAs: 'about'
      });
      // .otherwise({
      //   redirectTo: '/'
      // });
  })
  .config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('6588d7afa3c94a39a2a081c9ef2d64c9');
  SpotifyProvider.setRedirectUri('http://localhost:9000/#/callback');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
  // SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
});

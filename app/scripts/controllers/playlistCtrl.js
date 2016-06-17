'use strict';


angular.module('myNewProjectApp')
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
    $scope.playlistUri = $stateParams.playlistUri;
    $scope.user = "1240449583"
    $scope.playlist = "78j5UDBA0q62hdZ0meoh8w"
    console.log($scope.playlistUri);
  });

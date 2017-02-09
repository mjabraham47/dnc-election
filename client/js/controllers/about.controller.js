angular.module('dncElection')
.controller('AboutCtrl', function($scope, candidates) {
  $scope.candidates = candidates;
});
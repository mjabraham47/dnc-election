angular.module('dncElection')
.controller('AboutCtrl', function($scope, candidates) {
  console.log('candidates', candidates)
  $scope.candidates = candidates;
});
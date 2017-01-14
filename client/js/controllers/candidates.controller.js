angular.module('dncElection')
.controller('CandidatesCtrl', function($scope, candidate) {
  $scope.candidate = candidate;
});
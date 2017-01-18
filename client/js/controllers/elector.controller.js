angular.module('dncElection')
.controller('ElectorCtrl', function($scope, $state) {

	$scope.get_electors = function(demo) {
		$state.go('electorResults', {user: demo});
	};
	
});
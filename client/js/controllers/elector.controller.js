angular.module('dncElection')
.controller('ElectorCtrl', function($scope, ElectorService) {
	console.log('hi hi')
	$scope.formFilled = false;

	$scope.get_electors = function(demo) {
		console.log('runs')
		ElectorService.getElectors(demo).then(function(err, electors) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(electors);
				$scope.formFilled = true;
			};
		});
	}

	$scope.get_state = function(demo) {
		ElectorService.getState(demo.zip).then(function(err, electors) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(electors);
				$scope.formFilled = true;
			};
		});		
	}
});
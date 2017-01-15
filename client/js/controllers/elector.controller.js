angular.module('dncElection')
.controller('ElectorCtrl', function($scope, ElectorService) {
	console.log('hi hi')
	$scope.formFilled = false;
	$scope.messageTypes = false;
	$scope.pickedEmail = false;
	$scope.pickedText = false;
	$scope.pickedPostcard = false;
	$scope.emailSent = false;
	$scope.chooseElector = false;
				

	$scope.get_electors = function(demo) {
		ElectorService.getElectors(demo).then(function(electors) {
				$scope.formFilled = true;
				$scope.electors = electors;
				$scope.chooseElector = true;
		});
	}

	$scope.get_state = function(demo) {
		ElectorService.getState(demo.zip).then(function(electors) {
				console.log(electors);
				$scope.formFilled = true;
		});		
	}
	$scope.chooseMessage = function(elector) {
		$scope.messageTypes = true;
		$scope.selectedElector = elector;
	}

	$scope.pickEmail = function() {
		$scope.pickedEmail = true;
		$scope.pickedPostcard = false;
	}

	$scope.pickPostcard = function() {
		$scope.pickedPostcard = true;
		$scope.pickedEmail = false;
	}

	$scope.sendEmail = function(message, elector) {
		$scope.pickedEmail = false;
		$scope.emailSent = true;
	}

	$scope.sendPostcard = function(message, elector) {
		$scope.pickedPostcard = false;
		$scope.postcardSent = true;		
	}
});
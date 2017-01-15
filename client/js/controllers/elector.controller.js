angular.module('dncElection')
.controller('ElectorCtrl', function($scope, ElectorService) {
	$scope.formFilled = false;
	$scope.messageTypes = false;
	$scope.pickedEmail = false;
	$scope.pickedText = false;
	$scope.pickedPostcard = false;
	$scope.emailSent = false;
	$scope.chooseElector = false;
				

	$scope.get_electors = function(demo) {

		ElectorService.getElectors(demo).then(function(electors) {
			console.log(electors);
				$scope.formFilled = true;
				$scope.electors = electors;
				$scope.chooseElector = true;
		});

	}

	$scope.get_state = function(zip) {
		ElectorService.getState(zip).then(function(electors) {
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
		var card = {
			message: message,
			id: elector._id,
			state: elector.state
		}
		ElectorService.postcard(card).then(function(data) {
				console.log(data);

		});	
	}
});
angular.module('dncElection')
.controller('ElectorResultsCtrl', function($scope, ElectorService, electors) {

	$scope.electors = electors;
	$scope.chooseElector = true;
	$scope.messageTypes = false;
	$scope.pickedEmail = false;
	$scope.pickedText = false;
	$scope.pickedPostcard = false;
	$scope.emailSent = false;


	$scope.chooseMessage = function(elector) {
		$scope.messageTypes = true;
		$scope.selectedElector = elector;
		$scope.chooseElector = false;
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
		var mail = {
			message: message,
			id: elector._id
		}
		ElectorService.email(mail).then(function(data) {
				console.log(data);
		});
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
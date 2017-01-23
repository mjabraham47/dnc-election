angular.module('dncElection')
<<<<<<< HEAD
.controller('ElectorResultsCtrl', function($scope, ElectorService, electors) {
=======
.controller('ElectorResultsCtrl', function($scope, $window, ElectorService, electors) {
>>>>>>> 06510de1fb0c8a386381f3fc1e9c673307a929ea

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

<<<<<<< HEAD
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
=======
	var subject = 'Thoughts%20on%20the%20DNC%20Chair';

	var body = 'Dear DNC Elector, ';

	$scope.sendEmail = function(message, elector) {
		var email_body = message.length ? message : body;
		var email = elector.personal_email || 'fake@gmail.com';
		$window.open('mailto:' + email + '?subject=' + subject + '&body=' + email_body);
>>>>>>> 06510de1fb0c8a386381f3fc1e9c673307a929ea
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
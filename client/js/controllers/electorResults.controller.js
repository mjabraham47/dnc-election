angular.module('dncElection')
.controller('ElectorResultsCtrl', function($scope, $window, ElectorService, electors, created, candidate, userId) {

	$scope.electors = electors;
	$scope.created = created;
	$scope.chooseElector = true;
	$scope.messageTypes = false;
	$scope.pickedEmail = false;
	$scope.pickedText = false;
	$scope.pickedPostcard = false;
	$scope.emailSent = false;
	$scope.candidate = candidate;


	$scope.states = [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ];
	$scope.chooseMessage = function(elector) {
		$scope.messageTypes = true;
		$scope.selectedElector = elector;
		$scope.chooseElector = false;
	};

	$scope.pickEmail = function() {
		$scope.pickedEmail = true;
		$scope.pickedPostcard = false;
	};

	$scope.pickPostcard = function() {
		$scope.pickedPostcard = true;
		$scope.pickedEmail = false;
	};

	var subject = 'Thoughts%20on%20the%20DNC%20Chair';

	var body = 'Dear DNC Elector, ';

	$scope.sendEmail = function(message, elector) {
		var email_body = message.length ? message : body;
		var email = elector.personal_email || 'fake@gmail.com';
		$window.open('mailto:' + email + '?subject=' + subject + '&body=' + email_body);
	};

	$scope.sendPostcard = function(info) {
		$scope.pickedPostcard = false;
		$scope.postcardSent = true;	
		var card = {
			message: info.message,
			name: info.first_name + ' ' + info.last_name,
            street_address: info.street_address,
            city: info.city,
            state: info.state,
            zip: info.zip,
            candidate: candidate,
            user_id: userId		
		};
		ElectorService.postcard(card).then(function(data) {
				console.log(data);
				
		});	
	}
});
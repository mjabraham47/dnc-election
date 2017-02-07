angular.module('dncElection')
.controller('ElectorResultsCtrl', function($scope, $location, $window, lodash, ElectorService, electors, created, candidate, userId, envService, $sce, user) {


	$scope.electors = electors;
	$scope.created = created;
	$scope.chooseElector = true;
	$scope.messageTypes = false;
	$scope.pickedEmail = false;
	$scope.pickedText = false;
	$scope.pickedPostcard = false;
	$scope.emailSent = false;
	$scope.candidate = candidate;
	$scope.postcardSent = false;	
	$scope.postcardFront = false;
	$scope.postcardBack = false;
	$scope.user = user;
	$scope.userId = '12345';

	console.log($scope.electors);
	$scope.email = {
		message: "Dear DNC Delegates, I'm endorsing " +$scope.candidate.first_name + ' ' + $scope.candidate.last_name + " to be the next Chair of the Democratic National Committee because.."
	};

	var paypalEnv = envService.read('paypalEnv');
	var paypalClientId = envService.read('paypalClientId');

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
		$scope.postcard.first_name = user.first_name; 
		$scope.postcard.last_name = user.last_name;
		$scope.postcard.state = electors[0].state || ''; 
		$scope.postcard.zip = user.zip;
		$scope.postcard.message = "I endorse " + $scope.candidate.first_name + ' ' + $scope.candidate.last_name + " to be the next Chair of the Democratic National Committee."
	};

	var subject = 'Thoughts%20on%20the%20DNC%20Chair';

	var body = 'Dear DNC Elector, ';

	$scope.sendEmail = function(message, elector) {
		var emails = lodash.map(lodash.uniq($scope.electors, 'personal_email'), 'personal_email');
		var email_body = $scope.email.message;
		var subject = $scope.user.first_name + ' ' + $scope.user.last_name + ' Endorses ' + $scope.candidate.first_name + ' ' + $scope.candidate.last_name + ' for the DNC Chairmanship';
		var email = $scope.electors[0].personal_email;
		console.log('email', email);
		$window.open('mailto:' + email + '?subject=' + subject + '&body=' + email_body);
	};
 
	//sends the postcard along with paypal confirmation info
	$scope.sendPostcard = function(info, paymentId) {
		$scope.pickedPostcard = false;
		var card = {
			message: info.message || '',
			name: info.first_name + ' ' + info.last_name || '',
            street_address: info.street_address || '',
            city: info.city || '',
            state: info.state || '',
            zip: info.zip || '',
            candidate: candidate,
            user_id: userId,
            paymentId : paymentId	
		};
		ElectorService.postcard(card).then(function(data) {
				$scope.postcardFront = $sce.trustAsResourceUrl(data[0].large);

				$scope.postcardBack = $sce.trustAsResourceUrl(data[1].large);

				$scope.postcardSent = true;
		});	
	}

	$scope.postcard = {};
	$scope.buyPostcard = function(card) {
		$scope.postcard = card;
	}	

	$scope.cancel = function() {
		$scope.pickedPostcard = false;
	}

    paypal.Button.render({
    
        env: paypalEnv, // Optional: specify 'sandbox' environment
    
        client: {
            sandbox:    paypalClientId,
            production: paypalClientId
        },

        payment: function() {
        
            var env    = this.props.env;
            var client = this.props.client;
        
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: { total: '1.00', currency: 'USD' }
                    }
                ]
            });
        },

        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

        onAuthorize: function(data, actions) {
        
            // Optional: display a confirmation page here
        
            return actions.payment.execute().then(function(err) {
                // Show a success page to the buyer
                $scope.sendPostcard($scope.postcard, data.paymentID);
            });
        }

    }, '#paypal-button');

});
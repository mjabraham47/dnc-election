angular.module('dncElection')
.controller('ElectorResultsCtrl', function($scope, $window, ElectorService, electors, created, candidate, userId, envService) {

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
	};

	var subject = 'Thoughts%20on%20the%20DNC%20Chair';

	var body = 'Dear DNC Elector, ';

	$scope.sendEmail = function(message, elector) {
		var email_body = message.length ? message : body;
		var email = elector.personal_email || 'fake@gmail.com';
		$window.open('mailto:' + email + '?subject=' + subject + '&body=' + email_body);
	};

	$scope.sendPostcard = function(info, paymentId) {
		$scope.pickedPostcard = false;
		console.log(info)
		var card = {
			message: info.message,
			name: info.first_name + ' ' + info.last_name,
            street_address: info.street_address,
            city: info.city,
            state: info.state,
            zip: info.zip,
            candidate: candidate,
            user_id: userId,
            paymentId : paymentId	
		};
		ElectorService.postcard(card).then(function(data) {
				console.log(data);
				$scope.postcardFront = data[0];
				$scope.postcardBack = data[1];
				console.log($scope.postcardFront);
				console.log($scope.postcardBack);
				$scope.postcardSent = true;	
		});	
	}

	$scope.postcard = {};
	$scope.buyPostcard = function(card) {
		$scope.postcard = card;
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
            console.log('authData:', data);
            // console.log('actions:', actions);
        
            return actions.payment.execute().then(function(err) {
                // Show a success page to the buyer
                $scope.sendPostcard($scope.postcard, data.paymentID);
            });
        }

    }, '#paypal-button');


});
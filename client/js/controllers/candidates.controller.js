angular.module('dncElection')
.controller('CandidatesCtrl', function($scope, candidate, $uibModal, $state) {
	$scope.platform = candidate.platform.replace(/\n\r?/g, '<br />');
  $scope.candidate = candidate;

  $scope.openEndorseModal = function(){
  	var modalInstance = $uibModal.open({
  		ariaLabelledBy: 'modal-title',
      templateUrl: 'templates/endorseModal.html',
      controller: 'EndorseCtrl',
      size: 'md',
      resolve: {
      	candidate: function() {
      		return $scope.candidate;
      	}
      }
  	});

  	modalInstance.result.then(function(email){
  		var created = user.email ? true : false;
  			return $state.go('electorResults', {email: email, created: created});
  	});
  };
})
.controller('EndorseCtrl', function($scope, candidate, $uibModalInstance, UserService){
	$scope.candidate = candidate;
	$scope.confirmed = false;
	$scope.errored = false;

	$scope.ok = function() {
		if (!$scope.confirmed) {
			$scope.confirmed = true;
		} else {
			//POST request to /users
		}
	};

	$scope.endorse = function(user) {
		if (!user) return;
		console.log('user', user)

		user.endorsed = $scope.candidate._id;
		UserService.create(user, function(){
			uibModalInstance.close(user.email);
		});
	};

	$scope.confirm = function() {
		$scope.confirmed = true;
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
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

  	modalInstance.result.then(function(result){
  		var created = result.created ? true : false;
			return $state.go('electorResults', {userId: result.userId, created: result.created, candidate: candidate});
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

		user.endorsed = $scope.candidate._id;
		return UserService.create(user)
		.then(function(res){
			$uibModalInstance.close(res.data);
		});
	};

	$scope.confirm = function() {
		$scope.confirmed = true;
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
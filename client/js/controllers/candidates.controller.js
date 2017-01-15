angular.module('dncElection')
.controller('CandidatesCtrl', function($scope, candidate, $uibModal, $state) {
	console.log('candidate', candidate)
	$scope.platform = candidate.platform.replace(/\n\r?/g, '<br />');
	console.log('platform', $scope.platform)
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

  	modalInstance.result.then(function(user){
  		console.log('user', user)
  		return $state.go('elector', {user: user});
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
		.then(function(createdUser){
			if (createdUser) {
				console.log('createdUser', createdUser)
				$uibModalInstance.close(createdUser);
			} else {
				$scope.errored = true;
			}
		})
		.catch(function(err){
			$scope.errored = true;
		});
	};

	$scope.confirm = function() {
		$scope.confirmed = true;
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
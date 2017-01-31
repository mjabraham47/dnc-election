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
.controller('EndorseCtrl', function($scope, candidate, $uibModalInstance, UserService, envService){
	$scope.candidate = candidate;
	$scope.confirmed = false;
	$scope.errored = false;
	$scope.gRecaptchaResponse = '';
	$scope.model = {};
	var recaptcha;

	if (envService.get() === 'development') {
		$scope.model.key = '6LcclxMUAAAAAKxjhIvP22bFparObb1164xj1wli';
	} else {
		$scope.model.key = '6Ld_dBMUAAAAABIcce9VC7qOi9kpiJDnqgElWGue';
	}

	$scope.setResponse = function (response) {
    $scope.response = response;
	};

	$scope.setWidgetId = function (widgetId) {
	    $scope.widgetId = widgetId;
	};

	$scope.cbExpiration = function() {
	    vcRecaptchaService.reload($scope.widgetId);
	    $scope.response = null;
	};


	$scope.ok = function() {
		if (!$scope.confirmed) {
			$scope.confirmed = true;
		} else {
			//POST request to /users
		}
	};

	$scope.endorse = function(user) {
		console.log('')
		if (!user || !$scope.response) return;
		user.recaptcha = $scope.response;

		if (user.gender === 'null') user.gender = null;
		user.endorsed = $scope.candidate._id;
		console.log('user', user)
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
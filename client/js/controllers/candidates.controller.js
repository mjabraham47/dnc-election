angular.module('dncElection')
    .controller('CandidatesCtrl', function($scope, candidate, $uibModal, $state, PostcardService) {
        $scope.platform = candidate.platform.replace(/\n\r?/g, '<br />');
        $scope.candidate = candidate;

        $scope.openEndorseModal = function() {
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

            modalInstance.result.then(function(result) {
            	PostcardService.passingData({user: result.user, candidate: $scope.candidate})
                var created = result.created ? true : false;
                return $state.go('electorResults', { userId: result.user._id, created: result.created, candidate: candidate });
            });
        };
    })
    .controller('EndorseCtrl', function($scope, candidate, $uibModalInstance, UserService) {
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
            if (user.gender === 'null') user.gender = null;
            user.endorsed = $scope.candidate._id;
            return UserService.create(user)
                .then(function(res) {
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

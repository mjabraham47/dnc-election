angular.module('dncElection')
.controller('ElectorCtrl', function($scope, ElectorService) {
	var self = this;
	self.formFilled = false;

	self.get_electors = function(demo) {
		console.log('runs')
		ElectorService.getElectors(demo).then(function(err, electors) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(electors);
				self.formFilled = true;
			};
		});
	}
});
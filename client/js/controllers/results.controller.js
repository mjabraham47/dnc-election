angular.module('dncElection')
.controller('ResultsCtrl', function(results) {
	var self = this;

	this.data = results.data;

	this.labels = results.labels;
	
});
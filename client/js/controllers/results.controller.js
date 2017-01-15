angular.module('dncElection')
.controller('ResultsCtrl', function(results) {
	var self = this;

	this.data = results.data;

	this.labels = results.labels;

	this.ColorBar = ['#2F4F84'];    
  this.DataSetOverride = [{ yAxisID: 'y-axis-1' }]; //y-axis-1 is the ID defined in scales under options.
 
   this.options = {
   			defaultFontSize: 25,
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
    }

	// this.options = {
	// 	bar: {
	// 		barThickness: 100,
	// 		yAxes: {
	// 			barThickness: 100
	// 		}
	// 	},
	// 	scales: {
	// 		display: false
	// 	},
	// 	yAxes: {
	// 		barThickness: 100
	// 	}
	// };
});
angular.module('dncElection')
.controller('ResultsCtrl', function(results) {
	var self = this;

	this.data = results;

    console.log(results)

})
.directive("resultsChart", function($window) {
  return{
    restrict: "EA",
    scope: {
    	chartData: '='
    },
    template: "<div id='results-chart' class='results-chart'></div>",
    link: function(scope, elem, attrs){
    	console.log('results')

    	var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;
			    
			var d3 = $window.d3;
			var div = d3.select('#results-chart').append("div").attr("class", "toolTip");

			var axisMargin = 20,
            margin = 40,
            valueMargin = 4,
            width = parseInt(d3.select('#results-chart').style('width'), 10),
            height = parseInt(d3.select('#results-chart').style('height'), 10),
            barHeight = (height-axisMargin-margin*2)* 0.4/scope.chartData.dataPoints.length,
            barPadding = (height-axisMargin-margin*2)*0.6/scope.chartData.dataPoints.length,
            data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(scope.chartData.dataPoints, function(d) { return d.data; });

    var svg = d3.select('#results-chart')
            .append("svg")
            .attr("width", width)
            .attr("height", height);

    bar = svg.selectAll("g")
            .data(scope.chartData.dataPoints)
            .enter()
            .append("g");

    bar.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

    bar.append("text")
            .attr("class", "name")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .text(function(d){
                return d.name;
            }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

    var scale = d3.scaleLinear()
            .domain([0, max])
            .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.axisBottom()
            .scale(scale)
            .tickSize(-height + 2*margin + axisMargin);

    bar.append("rect")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scale(d.data);
            });

    bar.append("text")
            .attr("class", "data")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (parseFloat((d.data/scope.chartData.total) * 100).toFixed(2) +"%");
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scale(d.data));
            });

    svg.insert("g",":first-child")
            .attr("class", "axisHorizontal")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
            .call(xAxis);

    }
  };
});
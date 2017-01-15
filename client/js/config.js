angular.module('dncElection')
.config(function($stateProvider, $urlRouterProvider, ChartJsProvider) {
  $stateProvider
  .state('about', {
      url:'/about',
      templateUrl: 'templates/about.html',
      controller: 'AboutCtrl',
  })
  .state('candidates', {
      url:'/candidates',
      templateUrl: 'templates/candidates.html',
      resolve: {
        candidates: function(CandidateService) {
          return CandidateService.getCandidates();
        }
      },
      controller: function($scope, candidates){
        $scope.candidates = candidates;
      },
  })
  .state('candidates.overview', {
    url: '/overview',
    templateUrl: 'templates/candidateOverview.html',
    resolve: {},
    controller: function(){

    }
  })
  .state('candidates.detail', {
    url: '/:id',
    templateUrl: 'templates/candidateDetail.html',
    resolve: {
      candidate: function($stateParams, candidates, lodash) {
        return lodash.find(candidates, {_id: $stateParams.id});
      }
    },
    controller: 'CandidatesCtrl'
  })
  .state('elector', {
      url:'/elector',
      templateUrl: 'templates/elector.html',
      controller: 'ElectorCtrl'
  })
  .state('electorResults', {
    url: '/elector/results',
    params: {
      user: null
    },
    resolve: {
      electors: function(ElectorService, $stateParams){
        return ElectorService.getElectors($stateParams.user);
      }
    },
    templateUrl: 'templates/elector-results.html',
    controller: 'ElectorResultsCtrl'
  })
  .state('results', {
    url: '/results',
    templateUrl: 'templates/results.html',
    controller: 'ResultsCtrl',
    controllerAs: 'resultsCtrl',
    resolve: {
      results: function(CandidateService){
        return CandidateService.getCandidates()
        .then(function(candidates){
          var total = 0;
          var dataPoints = candidates.map(function(candidate){
            var fullName = candidate.first_name  + ' ' + candidate.last_name;
            total += candidate.endorsements;
            return {
              name: fullName,
              data: candidate.endorsements
            }
          });

          return {
            dataPoints: dataPoints,
            total: total
          }
        });
      }
    }
  });

  $urlRouterProvider.otherwise('/about');

  // Configure all charts
  ChartJsProvider.setOptions({
    chartColors: ['#E8EDF1'],
    defaultFontSize: 25,
    responsive: false
  });
})
  .constant('$webroot', 'https://clause.herokuapp.com');

// To account for plunker embeds timing out,preload the async data
// angular.module('dnc-election').run(function($http) {
//   $http.get('data/people.json',{cache: true });
// });
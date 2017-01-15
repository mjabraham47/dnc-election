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
  .state('results', {
    url: '/results',
    templateUrl: 'templates/results.html',
    controller: 'ResultsCtrl',
    controllerAs: 'resultsCtrl',
    resolve: {
      results: function(CandidateService){
        return CandidateService.getCandidates()
        .then(function(candidates){
          var result = {
            data: [],
            labels:[]
          };
          candidates.forEach(function(candidate){
            var fullName = candidate.first_name  + ' ' + candidate.last_name;
            result.labels.push(fullName);
            result.data.push(candidate.endorsements);
          });

          return result;
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
});

// To account for plunker embeds timing out,preload the async data
// angular.module('dnc-election').run(function($http) {
//   $http.get('data/people.json',{cache: true });
// });
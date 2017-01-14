angular.module('dncElection')
.config(function($stateProvider, $urlRouterProvider) {
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
        candidates: function() {
          // return CandidateService.getCandidates();
          return [];
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
    templateUrl: 'template/candidateDetail.html',
    resolve: {
      candidate: function($stateParams) {
        return $stateParams.candidate;
      }
    },
    controller: 'CandidatesCtrl'
  })
  .state('elector', {
      url:'/elector',
      templateUrl: 'templates/elector.html',
      controller: function(){
      },
  });

  $urlRouterProvider.otherwise('/about');
});

// To account for plunker embeds timing out,preload the async data
// angular.module('dnc-election').run(function($http) {
//   $http.get('data/people.json',{cache: true });
// });
angular.module('dncElection')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('about', {
      url:'/about',
      templateUrl: 'templates/about.html',
      controller: function(){
      },
  })
  .state('candidates', {
      url:'/candidates',
      templateUrl: 'templates/candidates.html',
      controller: function(){
      },
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
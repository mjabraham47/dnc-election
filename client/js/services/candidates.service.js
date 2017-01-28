angular.module('dncElection')
.factory('CandidateService', function($http, envService) {
  
  
  var webroot;
  if (envService.get() === 'development') {
    webroot = '';
  }
  else if (envService.get() === 'staging') {
    webroot = 'https://rundncstaging.herokuapp.com'
  }
  else if (envService.get() === 'production') {
    webroot = 'https://rundnc.herokuapp.com'
  }
 
  var service = {
    getCandidates: function() {
      return $http.get(webroot + '/candidates', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
    
    getCandidate: function(id) {}
  };
  
  return service;
});
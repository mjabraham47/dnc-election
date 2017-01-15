angular.module('dncElection')
.factory('CandidateService', function($http, $webroot) {
  var service = {
    getCandidates: function() {
      return $http.get($webroot + '/candidates', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
    
    getCandidate: function(id) {}
  };
  
  return service;
});
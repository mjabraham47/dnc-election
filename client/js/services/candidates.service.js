angular.module('dncElection')
.factory('CandidateService', function($http) {
 
  var service = {
    getCandidates: function() {
      return $http.get('/candidates', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
    
    getCandidate: function(id) {}
  };
  
  return service;
});
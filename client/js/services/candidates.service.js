angular.module('dncElection')
.factory('CandidateService', function($http, ENV) {
  
  var webroot;

  ENV === 'development' ? webroot = '' : webroot = 'https://rundncstaging.herokuapp.com';

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
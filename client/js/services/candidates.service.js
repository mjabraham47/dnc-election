angular.module('dncElection')
.service('CandidateService', function($http) {
  var service = {
    getCandidates: function() {
      return $http.get('data/people.json', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
    
    getCandidate: function(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }
      
      return service.getAllPeople().then(function (people) {
        return people.find(personMatchesParam)
      });
    }
  }
  
  return service;
})
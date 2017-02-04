angular.module('dncElection')
.factory('StateService', function($http) {
 
  var service = {
    getState: function(state) {
      return $http.get('/states/' + state, { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
  };
  
  return service;
});
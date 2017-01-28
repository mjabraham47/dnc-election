angular.module('dncElection')
.service('UserService', function($http) {
 
  var service = {
    create: function(data) {
    	return $http.post('/users/endorse', data);
    }
  };
  
  return service;
})
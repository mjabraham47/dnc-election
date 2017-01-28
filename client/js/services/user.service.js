angular.module('dncElection')
.service('UserService', function($http, $webroot) {
  var service = {
    create: function(data) {
    	return $http.post($webroot + '/users/endorse', data);
    }
  };
  
  return service;
})
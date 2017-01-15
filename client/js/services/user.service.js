angular.module('dncElection')
.service('UserService', function($http, $webroot) {
  var service = {
    create: function(data) {
    	return $http.post($webroot + '/users/create', data)
    	.then(function(res, err){
    		if (err) throw err;
    		else return res.data;

    	})
    }
  };
  
  return service;
})
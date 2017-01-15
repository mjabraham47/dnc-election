angular.module('dncElection')
.service('UserService', function($http) {
  var service = {
    create: function(data) {
    	return $http.post('/users/create', data)
    	.then(function(res, err){
    		if (err) throw err;
    		else return res.data;

    	})
    }
  };
  
  return service;
})
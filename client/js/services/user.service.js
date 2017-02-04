angular.module('dncElection')
.service('UserService', function($http) {
 
  var service = {
    create: function(data) {
    	return $http.post('/users/endorse', data)
    	.then(function(res, err){
    		console.log('res', res)
    		console.log('err', err)
    		if (err) throw new Error(err);
    		return res;
    	})
    }
  };
  
  return service;
})
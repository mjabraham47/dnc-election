angular.module('dncElection')
.service('UserService', function($http, $webroot) {
  var service = {
    create: function(data) {
      console.log('data', data)
    	$http.post($webroot + '/users/', data)
    	.then(function(res, err){
    		return res.data;
    	});
    }
  };
  
  return service;
})
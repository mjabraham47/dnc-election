angular.module('dncElection')
.service('UserService', function($http, ENV) {
  var webroot;
  ENV === 'development' ? webroot = '' : webroot = 'https://rundncstaging.herokuapp.com';
 
  var service = {
    create: function(data) {
    	return $http.post(webroot + '/users/create', data)
    	.then(function(res, err){
    		if (err) throw err;
    		else return res.data;

    	})
    }
  };
  
  return service;
})
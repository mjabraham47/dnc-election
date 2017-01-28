angular.module('dncElection')
.service('UserService', function($http, envService) {
  
  var webroot;
  if (envService.get() === 'development') {
    webroot = '';
  }
  else if (envService.get() === 'staging') {
    webroot = 'https://rundncstaging.herokuapp.com'
  }
  else if (envService.get() === 'production') {
    webroot = 'https://rundnc.herokuapp.com'
  }
 
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
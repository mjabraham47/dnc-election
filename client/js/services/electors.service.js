angular.module('dncElection')
.service('ElectorService', function($http, envService) {

  
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
    getElectors: function(userId) {
      	return $http.get($webroot + '/users/' + userId + '/electors').then(function(resp) {
        	return resp.data;
      });
    },
    createUser: function(user) {
      	return $http.post(webroot + '/users/create', user).then(function(resp) {
        	return resp.data;
      });    	
    },
    getState: function(zip) {
    	return $http.get(webroot + '/electors/getStateElectors/' + zip).then(function(resp) {
        	return resp.data;
      });
    },
    email: function(mail) {
      return $http.post(webroot + '/emails/email', mail).then(function(resp) {
          return resp.data;
      }); 
    },
    postcard: function(card) {
      return $http.post(webroot + '/postcards/postcard', card).then(function(resp) {
          return resp.data;
      }); 
    }
  };
  
  return service;
})
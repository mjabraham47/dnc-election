angular.module('dncElection')
.service('ElectorService', function($http, $webroot) {
  var service = {
    getElectors: function(demo) {
      	return $http.post('/electors/getAllElectors', demo).then(function(resp) {
        	return resp.data;
      });
    },
    createUser: function(user) {
      	return $http.post('/users/create', user).then(function(resp) {
        	return resp.data;
      });    	
    },
    getState: function(zip) {
    	return $http.get('/electors/getStateElectors/' + zip).then(function(resp) {
        	return resp.data;
      });
    },
    email: function(mail) {
      return $http.post('/emails/email', mail).then(function(resp) {
          return resp.data;
      }); 
    },
    postcard: function(card) {
      return $http.post('/postcards/postcard', card).then(function(resp) {
          return resp.data;
      }); 
    }
  };
  
  return service;
})
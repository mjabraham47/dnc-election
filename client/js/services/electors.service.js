angular.module('dncElection')
.service('ElectorService', function($http) {
  var service = {
    getElectors: function(demo) {
      	return $http.post('http://localhost:3000/electors/getAllElectors', demo).then(function(resp) {
        	return resp.data;
      });
    },
    createUser: function(user) {
      	return $http.post('http://localhost:3000/users/create', user).then(function(resp) {
        	return resp.data;
      });    	
    },
    getState: function(zip) {
    	return $http.get('http://localhost:3000/electors/getStateElectors/' + zip).then(function(resp) {
        	return resp.data;
      });
    },
    email: function(mail) {
      return $http.post('http://localhost:3000/emails/email', mail).then(function(resp) {
          return resp.data;
      }); 
    },
    postcard: function(card) {
      return $http.post('http://localhost:3000/postcards/postcard', card).then(function(resp) {
          return resp.data;
      }); 
    }
  };
  
  return service;
})
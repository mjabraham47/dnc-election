angular.module('dncElection')
    .factory('PostcardService', function($http) {

        var service = {
            postcardData: {},
            passingData: function(data) {
                this.postcardData = data;
            },
            sendPostcard: function(card) {
                return $http.post('/postcards/postcard', card).then(function(resp) {
                    return resp.data;
                });
            }
        }
        return service;
    });

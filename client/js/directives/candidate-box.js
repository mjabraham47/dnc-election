angular.module('dncElection')
  .directive('candidateBox', function() {
    return {
      templateUrl: 'templates/candidateBox.html',
      scope: {
        candidate: '='
      },
      controllerAs: 'candidateBoxCtrl',
      bindToController: true,
      controller: function() {
        var vm = this;
      }
    };
  });
(function () {
	console.log('LOADING APP')
    var myApp = angular.module('dncElection', [
        'ui.router',
        // 'ui.bootstrap'
    ]);
    console.log('myApp', myApp)
    
    // myApp.config(function($stateProvider, $urlRouterProvider) {
		  // console.log('CONFIG')
		  // $stateProvider
		  // .state('about', {
		  //     url:'/about',
		  //     templateUrl: 'templates/about.html',
		  //     controller: function(){
		  //       console.log("HERE")
		  //     },
		  // })
		  // // console.log('HERE')
		  // // // An array of state definitions
		  // // var states = [
		  // //   {
		  // //     name: 'about',
		  // //     url: '/about',
		  // //     // Using component: instead of template:
		  // //     component: 'about'
		  // //   },
		    
		  // //   {
		  // //     name: 'candidates',
		  // //     url: '/candidates',
		  // //     component: 'candidates',
		  // //     //get candidate info here
		  // //     resolve: {}
		  // //   },
		  // //   {
		  // //     name: 'elector',
		  // //     url: '/elector',
		  // //     component: 'elector',
		  // //     //get elector info here
		  // //     resolve: {

		  // //     }
		  // //   },
		  // // ];
		  
		  // // // Loop over the state definitions and register them
		  // // states.forEach(function(state) {
		  // //   console.log('registering state')
		  // //   $stateProvider.state(state);
		  // // });

		//   // $urlRouterProvider.otherwise('/about');
		// });
})();
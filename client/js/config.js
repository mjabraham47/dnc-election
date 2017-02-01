angular.module('dncElection')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, ChartJsProvider, envServiceProvider, $compileProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html',
                resolve: {
                    candidates: function(CandidateService) {
                        return CandidateService.getCandidates();
                    }
                },
                controller: 'AboutCtrl',
            })
            .state('candidates', {
                url: '/candidates',
                templateUrl: 'templates/candidates.html',
                resolve: {
                    candidates: function(CandidateService) {
                        return CandidateService.getCandidates();
                    }
                },
                controller: function($scope, candidates) {
                    $scope.candidates = candidates;
                },
            })
            .state('candidates.overview', {
                url: '/overview',
                templateUrl: 'templates/candidateOverview.html',
                resolve: {},
                controller: function() {}
            })
            .state('candidates.detail', {
                url: '/:id',
                templateUrl: 'templates/candidateDetail.html',
                resolve: {
                    candidate: function($stateParams, candidates, lodash) {
                        return lodash.find(candidates, { _id: $stateParams.id });
                    }
                },
                controller: 'CandidatesCtrl'
            })
            .state('elector', {
                url: '/elector',
                templateUrl: 'templates/elector.html',
                controller: 'ElectorCtrl'
            })
            .state('electorResults', {
                url: '/elector/results',
                params: {
                    userId: null,
                    created: false,
                    candidate: null
                },
                resolve: {
                    electors: function(ElectorService, $stateParams) {
                        return ElectorService.getElectors($stateParams.userId);
                    },
                    created: function($stateParams) {
                        return $stateParams.created;
                    },
                    candidate: function($stateParams) {
                        return $stateParams.candidate;
                    },
                    userId: function($stateParams) {
                        return $stateParams.userId;
                    }
                },
                templateUrl: 'templates/elector-results.html',
                controller: 'ElectorResultsCtrl'
            })
            .state('results', {
                url: '/results',
                templateUrl: 'templates/results.html',
                controller: 'ResultsCtrl',
                controllerAs: 'resultsCtrl',
                resolve: {
                    results: function(CandidateService) {
                        return CandidateService.getCandidates()
                            .then(function(candidates) {
                                var total = 0;
                                var dataPoints = candidates.map(function(candidate) {
                                    var fullName = candidate.first_name + ' ' + candidate.last_name;
                                    total += candidate.endorsements;
                                    return {
                                        name: fullName,
                                        data: candidate.endorsements
                                    }
                                });
                                return {
                                    dataPoints: dataPoints,
                                    total: total
                                }
                            });
                    }
                }
            });

        $urlRouterProvider.otherwise('/about');

        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#E8EDF1'],
            defaultFontSize: 25,
            responsive: false
        });

        //enable cors requests
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // set the domains and variables for each environment
        envServiceProvider.config({
            domains: {
                development: ['localhost', 'dev.local'],
                staging: ['rundncstaging.herokuapp.com'],
                production: ['rundnc.herokuapp.com']
            },
            vars: {
                development: {
                    paypalClientId: 'AajxYzRgckzNETtYb1ARVLCLIjkxycuC2EfIIwy4G4VijASE6HsoUC2eKEeqGcu-LxJKmnP9W11_ePJK',
                    paypalEnv: 'sandbox'
                },
                staging: {
                    paypalClientId: 'AajxYzRgckzNETtYb1ARVLCLIjkxycuC2EfIIwy4G4VijASE6HsoUC2eKEeqGcu-LxJKmnP9W11_ePJK',
                    paypalEnv: 'sandbox'
                },
                production: {
                    paypalClientId: '',
                    paypalEnv: 'production'
                }
            }
        });


        // run the environment check, so the comprobation is made
        // before controllers and services are built
        envServiceProvider.check();

        $compileProvider.debugInfoEnabled(false);

    })
    // .config(['noCAPTCHAProvider', function (noCAPTCHAProvider) {
    //   noCaptchaProvider.setSiteKey('6Ld_dBMUAAAAABIcce9VC7qOi9kpiJDnqgElWGue');
    //   noCaptchaProvider.setTheme('dark');
    // }])
    .run(function($rootScope, envService) {
        var webroot;
        if (envService.get() === 'development') {
            webroot = '';
        } else if (envService.get() === 'staging') {
            webroot = 'https://rundncstaging.herokuapp.com'
        } else if (envService.get() === 'production') {
            webroot = 'https://rundnc.herokuapp.com'
        }
        $rootScope.baseUrl = webroot;

    });

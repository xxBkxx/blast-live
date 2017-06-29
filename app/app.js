(function(){

angular
	.module("blastApp", [ 'ngRoute', 'angular-jwt', 'ngMessages']);

angular
	.module("blastApp")
	.config(configBlock); 


	configBlock.$inject = ['$routeProvider', '$httpProvider', "$locationProvider"];

	function configBlock($routeProvider, $httpProvider, $locationProvider){

		$routeProvider
			.when('/login',{
				templateUrl: 'site/partials/login.html',
				controller:  "LoginController as ctrl"
			})
			.when('/addUser',{
				templateUrl: "site/partials/addUser.html",
				controller:  "AddUserController as ctrl"
			})
			.when('/add',{
				templateUrl: "site/partials/add.html",
				controller:  "AddController as ctrl",
				resolve: {

					username: function(authSrv){
						var username = authSrv.initUser()
						return username;
					}
				}
			})

			.when('/choice',{
				templateUrl: "site/partials/choice.html",
				controller:  "ChoiceController as ctrl",
				resolve: {

					username: function(authSrv){
						var username = authSrv.initUser();
						return username;
					}
				}
			})

			.when('/sentConfirmation',{
				templateUrl: "site/partials/sentConfirmation.html",
				controller: "SentConfirmationController as ctrl"
			})

			// .when('/setToken',{
			// 	// $httpProvider.default.headers
			// 	// redirectTo: '/setPassword'
			// })

			.when('/setPassword/:token',{
				templateUrl: "site/partials/newPassword.html",
				controller:  "NewPasswordController as ctrl"
			})

			.when('/confirmation',{
				templateUrl: "site/partials/confirmation.html"
				// controller:  ""
			})

			.when('/enterEmail',{
				templateUrl: "site/partials/enterEmail.html",
				controller:  "EnterEmailController as ctrl"
			})

			.when('/rejection',{
				templateUrl: "site/partials/rejection.html"
				// controller:  ""
			})

			.when('/search',{
				templateUrl: "site/partials/search.html",
				controller:  "SearchController as ctrl",
				resolve:{

						username: function(authSrv){
							var username = authSrv.initUser();
						return username;
					},

						initAstronauts: function(astronautSrv){
							astronauts = astronautSrv.initAstronauts();
							// console.log(astronauts.$$state);
						return astronautSrv.initAstronauts();
					}
				}
			})

			
			// .when('/uploads',{
			// 	templateUrl: "<p></p>"
			// })

			.otherwise({
				redirectTo: "/login"
			});

			// $locationProvider
			// 	.html5Mode({
			// 		enabled: false,
			// 		requireBase: false,
			// 		rewriteLinks: true
			// });

			// console.log()

			$httpProvider.interceptors.push(function($q, jwtHelper, $rootScope){

				return {

					request: function(config){

						if (localStorage.authToken != undefined){
							config.headers.authentication = localStorage.authToken;
						}
						// console.log(config);
						return config;
					},

					responseError: function(rejection){
						console.log(rejection); 
						if (rejection.status === 401){
							// console.log(rejection);
							
							$rootScope.$broadcast('httpResponse', rejection);
							return $q.reject(rejection);
						}

					},

					response: function(response){

						var deferred  = $q.defer();
						var promise   = deferred.promise;
						var status    = response.status;
						var authToken = response.headers('authentication');
						// console.log(response);

						// console.log(response.status);
						// This was for a listener on login.ctrl
						// if(response.status === 200){

						// 	// console.log(response.status);
						// 	$rootScope.$broadcast('success', response);
						// 	return $q.resolve(response);
						// }

						if (authToken){

							var decryptToken = jwtHelper.decodeToken(authToken);
							
							if (decryptToken.email){

								window.localStorage.setItem("authToken", JSON.stringify(authToken));
							}
						}
						// console.log( authToken);
						return response;
					}

				}
			})

	}
})();
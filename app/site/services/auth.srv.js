(function(){

	angular
		.module('blastApp')
		.service('authSrv', AuthService)

		function AuthService($rootScope, AUTH_EVENTS, $http, apiSrv, jwtHelper, $location, $timeout){
			var self         = this;
			self.login       = login;
			self.createUser  = createUser;
			self.initUser    = initUser;
			self.logout 	 = logout;
			self.isLoggedIn  = isLoggedIn;
			self.authentication = authentication;
			// self.isAuthenticated = isAuthenticated;
			// self.deleteToken = deleteToken;
			
			self.deleteTokenOnBrowserClose = function(){
				localStorage.removeItem('authToken');
			};

			// function isAuthenticated (){
			// 	return !!
			// }

			// $rootScope.$on(AUTH_EVENTS.notAuthenticated && "$routeChangeStart", function(event, next){
			// 		// console.log(currentLocation);
			// 		var currentLocation = $location.path();
			// 		if(currentLocation == '/login'){

			// 			console.log('authSrv Login');
			// 			// next();
			// 			// console.log(currentLocation);
			// 			// next();
			// 		} else if ( currentLocation !== '/login'){
						
			// 			console.log("currentLocation", $location.path());
			// 			event.preventDefault();
			// 			// self.authentication();
			// 		}
			// });


			function authentication(){

				return console.log('authSrv Auth');
			}

			function login(credentials){
				
				// return $timeout(function(){
				// 	apiSrv.request("/login", credentials, "POST")
				// 		.then (function(res){
				// 			console.log(res)
				// 			return res
				// 			// return $location.url('/choice'); OLD CODE
				// 			// credentials.delete('userName');
				// 			// credentials.delete('password');
				// 			// console.log(credentials);
				// 			// console.log(res);
				// 		});	
				// },1000);

				return apiSrv.request("/login", credentials, "POST")
						.then (function(res){
							console.log(res)
							return res
							// return $location.url('/choice'); OLD CODE
							// credentials.delete('userName');
							// credentials.delete('password');
							// console.log(credentials);
							// console.log(res);
						});	
				

				// apiSrv.request("/login", credentials, "POST");
			}			

			function isLoggedIn(token){

				if( token == ''        || 
					token == undefined || 
					token == 'guest'   ||
					token == null ){

					// console.log("is not loggin");
					// $('.login-message').css('display','unset');
					// $('.login-message').css('position','fixed');
			}

		
					// $('.login-message').css('top','50%');



			}

			function logout(){
				
				localStorage.removeItem("authToken");

				if ( !localStorage.getItem('authToken' )){
					$location.url('/login');
				}
			}

			function createUser(user){

				return apiSrv.request("/createUser", user, "POST")
					.then(function(res){
						// callback(res);
						// console.log(res);
						// $location.url('/home'); 
						return res;
					});
			}

			function initUser(){
				// if (localStorage.)

				var token = localStorage.authToken;

				if( token == undefined || token == '' ){
					return
				}else{
					var decrypt_token = jwtHelper.decodeToken(token);
					// console.log(decrypt_token)
					var username = decrypt_token.name.charAt(0).toUpperCase() + decrypt_token.name.slice(1);
					// decrypt_token.replace(firstLetter, )
				return username;
				}
			}

		}


})();
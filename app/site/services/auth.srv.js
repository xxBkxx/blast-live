(function(){

	angular
		.module('blastApp')
		.service('authSrv', AuthService)

		function AuthService($http, apiSrv, jwtHelper, $location, $timeout){
			var self         = this;
			self.login       = login;
			self.createUser  = createUser;
			self.initUser    = initUser;
			self.logout 	 = logout;
			self.isLoggedIn  = isLoggedIn;
			// self.deleteToken = deleteToken;
			
			self.deleteTokenOnBrowserClose = function(){
				localStorage.removeItem('authToken');
			};

			function login(credentials){
				
				$timeout(function(){
					apiSrv.request("/login", credentials, "POST")
						.then (function(){
							return $location.url('/choice');
							// credentials.delete('userName');
							// credentials.delete('password');
							// console.log(credentials);
							// console.log(res);
						});	
				},1000);

				// apiSrv.request("/login", credentials, "POST");
			}

			function isLoggedIn(token){

				if( token == ''        || 
					token == undefined || 
					token == 'guest'   ||
					token == null ){

					// console.log("is not loggin");
					$('.login-message').css('display','unset');
					$('.login-message').css('position','fixed');
			}

		
					// $('.login-message').css('top','50%');



			}

			function logout(){
				
				localStorage.removeItem("authToken");

				if ( !localStorage.getItem('authToken' )){
					$location.url('/login');
				}
			}

			function createUser(user, callback){

				apiSrv.request("/createUser", user, "POST")
					.then(function(res){
						callback(res);
						console.log(res);
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
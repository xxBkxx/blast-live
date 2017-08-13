( function() {
	angular.module( 'blastApp' )
		.controller( 'LoginController', LoginController );

	function LoginController($scope, $location, AUTH_EVENTS, authSrv, $rootScope, regExSrv ) {

		// set bg
		$('body').css('background-image','url("../assets/img/login-bg.jpg")');
		$('body').css('background-position-y', '-100px');
		$('body').css('background-position-x', 'calc(50% + 0px');


		this.login 		   = login;
		this.removeMessage = removeMessage;
		this.toEnterEmail  = toEnterEmail;
		this.regExSrv      = regExSrv;
		
		// $('.load-pic').hide()
		// this.loginFail	 = loginFail;
		// this.rs = $rootScope;
		// $rootScope.$on("httpResponse", function(event, args){
		// 	loginFail(args)
		// 	console.log(event,args);
		// })
		// console.log($rootScope);
		$scope.loginRegex = /[a-z0-9!()-._~@#`]/ig
		// $scope.getin	  = this.regExSrv.passwordRegEx; 
		// console.log("loginCTL: %s", $location.path());

		// authSrv.authentication($location.path());

		function removeMessage() {

			// hide messages that there might be

			$( '.failed-message' )
				.remove();
			this.userName = '';
			this.password = '';

			$scope.myForm.$setPristine();
			$scope.myForm.$setSubmitted();

		}

		function login() {
			// console.log('loging in');
			// console.log('userName %s', this.userName);

			// Create a formedata obj to hold login data
			var formData = new FormData();
			formData.append( 'userName', this.userName );
			formData.append( 'password', this.password );

			// console.log(this.password);

			$( '.load-pic' )
				.css( 'visibility', 'visible' );

			authSrv.login( formData ).then(function(res){

				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				console.log("pass");
				// console.log(res);
				// $scope.username = res;
				console.log(localStorage.getItem('authToken'));

			}, function(){

				$rootScope.$broadcast(AUTH_EVENTS.loginFail);
				console.log("fail");
			});
			



			this.showMessage = true;



			$rootScope.$on( 'httpResponse', function( event, args ) {
				
				// console.log(event);
				$( '.load-pic' )
					.css( 'visibility', 'hidden' );


			// this.showMessage = false;
				// console.log(args);
				// element.append("<p>Username/Password combo wasnt recongnized</p>")
			} );

			// Show any login error messages that there might be 

			// formData.set('userName', '');
			// formData.set('password', '');
			// console.log(formData.get('userName'));
			// console.log(res);
			// {
			// 	console.log('res %s', res);
			// 	if (res.status == 200){
			// 		$location.url('/choice');
			// 	} else if(res.status == 500) {
			// 		console.log('error');
			// 	}
			// };
		}

		function toEnterEmail(){
			$location.url('/enterEmail');
			// emailSrv.
		}
	}
	
} )();
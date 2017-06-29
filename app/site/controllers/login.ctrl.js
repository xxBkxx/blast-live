( function() {
	angular.module( 'blastApp' )
		.controller( 'LoginController', LoginController );

	function LoginController($scope, $location, authSrv, $rootScope, regExSrv ) {

		// set bg
		$('body').css('background-image','url("../assets/img/add-bg.jpg")');
		$('body').css('background-position', 'center');


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


		function removeMessage() {

			// hied messages that there might be

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
			var formData = new FormData();

			formData.append( 'userName', this.userName );
			formData.append( 'password', this.password );

			// console.log(this.password);

			authSrv.login( formData );

			$( '.load-pic' )
				.css( 'visibility', 'visible' );

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
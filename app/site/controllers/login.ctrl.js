( function() {
	angular.module( 'blastApp' )
		.controller( 'LoginController', LoginController );

	function LoginController( $location, authSrv, $rootScope ) {
		
		this.login = login;
		this.removeMessage = removeMessage;
		// $('.load-pic').hide()
		// this.loginFail	 = loginFail;
		// this.rs = $rootScope;
		// $rootScope.$on("httpResponse", function(event, args){
		// 	loginFail(args)
		// 	console.log(event,args);
		// })
		// console.log($rootScope);
		function removeMessage() {

			$( '.login-message' )
				.remove();
			this.userName = '';
			this.password = '';
		}

		function login() {
			// console.log('loging in');
			// console.log('userName %s', this.userName);
			var formData = new FormData();

			formData.append( 'userName', this.userName );
			formData.append( 'password', this.password );

			authSrv.login( formData );

			$( '.load-pic' )
				.css( 'visibility', 'visible' );
			$rootScope.$on( 'httpResponse', function( event, args ) {
				$( '.load-pic' )
					.css( 'visibility', 'hidden' );
				// $location.url('/choice');
				console.log( 'detected' );
				// console.log(args);
				// element.append("<p>Username/Password combo wasnt recongnized</p>")
			} );
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
		// function loginFail(args){
		// 		console.log(args.data.message);
		// }
	}
} )();
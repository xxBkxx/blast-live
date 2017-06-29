( function() {
	angular.module( 'blastApp' )
		.controller( 'NewPasswordController', NewPasswordController);

	function NewPasswordController($scope, regExSrv, emailSrv, $location, apiSrv, $rootScope) {

		console.log($location.path());

		var token = $location.path();

		this.submitNewPassword   = submitNewPassword;
		$scope.passwordRegEx     = regExSrv.passwordRegEx;

		console.log($scope.passwordRegEx);

		function submitNewPassword(){

			if( this.passwordOne === this.passwordTwo){

				formData = new FormData();

				formData.append('PasswordOne', this.passwordOne);
				formData.append('PasswordTwo', this.passwordTwo);
				formData.append('token', token);

				emailSrv.setPassword(formData);

				apiSrv.request('/setPassword', formData, "POST");


			$( '.load-pic' )
				.css( 'visibility', 'visible' );

			$rootScope.$on( 'httpResponse', function( event, args ) {
				
				$( '.load-pic' )
					.css( 'visibility', 'hidden' );


			// this.showMessage = false;
				// console.log(args);
				// element.append("<p>Username/Password combo wasnt recongnized</p>")
			} );


			} else{
				console.log('passwords dont match!!');
				return;
			}
		}
	}

})();
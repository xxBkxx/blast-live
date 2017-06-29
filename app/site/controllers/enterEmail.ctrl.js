( function() {
	angular.module( 'blastApp' )
		.controller( 'EnterEmailController', EnterEmailController);

	function EnterEmailController($timeout, $scope, $location, authSrv, emailSrv, $rootScope ) {
		
		this.sendForgotEmail = sendForgotEmail;
		this.removeMessage   = removeMessage;


		function removeMessage(){

			$('.login-message')
				.remove();

			this.accountAddy = '';

			$scope.forgotForm.$setPristine();
			$scope.forgotForm.$setSubmitted();

		}


		function sendForgotEmail(){

			var formData = new FormData();

			var data = this.accountAddy;

			formData.append('email' , data)
			emailSrv.sendForgotMail(formData);

			$('.load-pic')
				.css('visibility', "visible");

				// this.showMessage = true;

			$rootScope.$on('httpResponse', function(event, args){

				$('.load-pic')
					.css('visibility', 'hidden');

			});


			// $location.url('/sentConfirmation');
		} 
	}
})();
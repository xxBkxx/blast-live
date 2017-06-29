( function() {
	angular.module( 'blastApp' )
		.controller( 'SentConfirmationController', SentConfirmationController);

	function SentConfirmationController($location ) {
		
		this.toLoginPage = toLoginPage;


		function toLoginPage(){

			// TODO#1 automactially send the user to login page
			$location.url('/login');

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
(function(){
	angular
		.module("blastApp")
		.service('emailSrv', EmailService);

		function EmailService(apiSrv, $timeout, $location){

			var self 	  = this;

			self.sendMail       = sendMail;
			self.sendForgotMail = sendForgotMail;
			self.setPassword    = setPassword;

			function sendMail(data){
				// console.log(data);
				$timeout(function(){
					apiSrv.request('/email', data, "POST")

				});
			}

			function sendForgotMail(data){

				$timeout(function(){ 
					apiSrv.request('/sendForgotMail', data, "POST")
						.then(function(){
							return $location.url('/sentConfirmation');
						});
				}, 1000);
			}

			function setPassword(data){
				console.log(data);
				$timeout(function() {
					apiSrv.request('/setPassword', data, "POST")
						.then(function(){
							return $location.url('/confirmation'); 
						})
				}, 1000);
			}
		}
})();
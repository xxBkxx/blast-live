(function(){
	angular
		.module("blastApp")
		.service('emailSrv', EmailService);

		function EmailService(apiSrv){

			var self 	  = this;
			self.sendMail = sendMail;

			function sendMail(data){
				// console.log(data);
				apiSrv.request('/email', data, "POST");
			}
		}
})();
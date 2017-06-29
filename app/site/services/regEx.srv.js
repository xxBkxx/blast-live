(function(){
	angular
		.module('blastApp')
		.service('regExSrv', RegularExpressionService);
 
		function RegularExpressionService(){
			
			var self = this;
			
			self.emailRegEx    = /[a-z0-9!()-._~@#`]/ig
			self.passwordRegEx = /[\0]/ig

			


		}
})();
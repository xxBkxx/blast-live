(function(){

	angular
		.module('blastApp')
		.controller('ApplicationController', ApplicationController );

		function ApplicationController($location, $scope){
			this.toLoginPage = toLoginPage;
			// $location.url("/login");
			console.log(angular.element('body').controller());
			console.log($location.path());

			function toLoginPage(){
				console.log('tologin');
				// $('.login-message').css('display', 'block');
				$location.path("/login");
			}				
		}
})();
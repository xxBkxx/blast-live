(function(){

	angular
		.module('blastApp')
		.controller('ChoiceController', ChoiceController);

		function ChoiceController($location, username, authSrv){
			
			this.goToPage = goToPage;
			this.username = username;
			// this.authSrv  = authSrv;
			this.logout   = logout;

			function goToPage(page){

				if (page === 'add'){
					$location.url('/add');
				} else {
					$location.url('/search');
				}

			}

			function logout(){
				authSrv.logout();
			}
		}
})();
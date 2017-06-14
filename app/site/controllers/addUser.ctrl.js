(function(){

	angular
		.module('blastApp')
		.controller('AddUserController', AddUserController);

		function AddUserController(authSrv){
			this.createUser = createUser;	
			var formData = new FormData();

			function createUser(){

				console.log('creating user');
				console.log('name %s', this.name);

				formData.append('userName', this.userName);
				formData.append('password', this.password);
				formData.append('name', 	this.name)

				authSrv.createUser(formData, function(res){

					console.log('res %s', res);

					if (res.status == 200){
						$location.url('/choice');
					} else {
						console.log('error');
					}
				});

			}
		}
})();
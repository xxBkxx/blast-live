(function(){

	angular
		.module('blastApp')
		.controller('AddController', AddController);

		function AddController(apiSrv, AUTH_EVENTS, $location, $window, username, authSrv, $scope){

			this.add         = add;
			this.goToSearch  = goToSearch;
			this.clearFields = clearFields;
			this.username    = username;
			this.logout		 = logout;
			this.authSrv     = authSrv;
			this.toLoginPage = toLoginPage;
			// this.deleteTokenOnBrowserClose = deleteTokenOnBrowserClose;

			$('body').css('background-image','url("../assets/img/add-bg.jpg")');
			$('body').css('background-position', 'center');

			// Check for the login token
			var token = localStorage.getItem('authToken');
			// console.log(token);
			// authSrv.isLoggedIn(token);

			// Unload the token on browser exit...
			// $window.onunload = authSrv.deleteTokenOnBrowserClose;

			// this.imgPreview(imageFile);

			// Image Preview ##############
			// ############################

			// authSrv.authentication($location.url());

			function logout(){
				authSrv.logout();
			}

			function toLoginPage(){
				$location.url('/login');
			}

			$scope.imgPreview = function(){

				var file 	= document.querySelector('input[type=file]').files[0];
				var preview = document.querySelector(".default-pic");
				var reader  = new FileReader();

				reader.addEventListener("load", function(){					
					preview.src = reader.result;
				}, false);

				if(file){
					reader.readAsDataURL (file);
				}
			}
			//#############################

			function goToSearch(){
				$location.url('/search');
			}

			function add(){

				// $scope.notAuthorized();
				
				var formData = new FormData();

				formData.append('file', this.file);
				formData.append('name', this.name);
				formData.append('sex', this.sex);
				formData.append('addressOne', this.addressOne);
				formData.append('addressTwo', this.addressTwo);
				formData.append('city', this.city);
				formData.append('province', this.province);
				formData.append('notes', this.notes);
				formData.append('certifications', this.certifications);
				formData.append('payInfo', this.payInfo);

				// console.log(this.name);

				apiSrv.request('/addAstronaut', formData, 'POST')
				// this.clearFields();
					.then(function(res){
						// console.log(res.data);
						return clearFields(formData);
				});

				
				this.file = null;
				this.name = null;
				this.sex  = null;
				this.addressOne = null;
				this.addressTwo = null;
				this.city = null;
				this.province = null;
				this.notes =  null;
				this.certifications = null;
				this.payInfo = null;
				// console.log(this.name, this.sex,this.address1);
			}	

			function clearFields(formData){
			// 	console.log(formData.getAll("name"));
			// 	var item = "\'p[0]\'";
			// 	for(var p of formData.keys()){

			// 		console.log(p);
			// 		formData.delete(p);

			// 	}
			
				$('#file').val('');
				formData.delete('file');
				formData.delete('name');
				formData.delete('sex');
				formData.delete('addressOne');
				formData.delete('addressTwo');
				formData.delete('city');
				formData.delete('province');
				formData.delete('notes');
				formData.delete('certifications');
				formData.delete('payInfo');

				// this.name = null;
				// this.sex  = '';
				// this.addressOne = '';
				// this.addressTwo = '';
				// this.city = '';
				// this.province = '';
				// this.note =  '';
				// this.certifications = '';
				// this.payInfo = '';

				// console.log(formData.getAll("name"));

			}	
		}
})();
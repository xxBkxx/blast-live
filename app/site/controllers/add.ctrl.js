(function(){

	angular
		.module('blastApp')
		.controller('AddController', AddController);

		function AddController(apiSrv, $location, username, authSrv, $scope){

			this.add         = add;
			this.goToSearch  = goToSearch;
			this.clearFields = clearFields;
			this.username    = username;
			this.logout		 = logout;
			this.authSrv     = authSrv;




			// this.imgPreview(imageFile);

			// Image Preview ##############
			// ############################

			function logout(){
				authSrv.logout();
			}

			$scope.imgPreview = function(){

				var file 	= document.querySelector('input[type=file]').files[0];
				var preview = document.querySelector(".default-pic");
				var reader  = new FileReader();

				reader.addEventListener("load", function(){					preview.src = reader.result;
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

				console.log(this.name);

				apiSrv.request('/addAstronaut', formData, 'POST')
				// this.clearFields();
					.then(function(res){
						// console.log(res.data);
						return clearFields();
				});
				$('#file').val('');
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
				console.log(this.name, this.sex,this.address1);
			}	

			function clearFields(){
			// 	console.log(formData.getAll("name"));
			// 	var item = "\'p[0]\'";
			// 	for(var p of formData.keys()){

			// 		console.log(p);
			// 		formData.delete(p);

			// 	}

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

				console.log(formData.getAll("name"));

			}	
		}
})();
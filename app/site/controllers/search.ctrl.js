(function(){
	angular
		.module('blastApp')
		.controller('SearchController', SearchController);

		function SearchController($rootScope, $window,initAstronauts, apiSrv, $timeout, authSrv, $scope, emailSrv, $location, username, $rootScope){
		

			var responseData ={};
			// Set the background
			$('body').css('background-image','url("../assets/img/search-bg.jpg")');
			$('body').css('background-position', 'center');

			// Authentication
			// var token = localStorage.getItem('authToken');
			// return $timeout (function(){
			// 	apiSrv.request('/search_route', token , "POST" )
			// 		.then(function(res){
			// 			return $location.url(res.data.redirect);
			// 		})
			// },0);
			// $rootScope.$on('$routeChangeStart', function(event, next){

			// })



			// Set Properties
			this.astronauts 	  = initAstronauts;
			// this.displayPicture= displayPicture;
			// this.arrayBufferToBase64 = arrayBufferToBase64;
			// this.updateData    = updateData;
			this.emailAstros 	  = emailAstros;
			this.searchAstronauts = searchAstronauts;
			this.clearSearch      = clearSearch;
			// this.removePic	  = removePic;
			this.goToAdd		  = goToAdd;
			this.username		  = username;
			this.logout			  = logout;
			this.toLoginPage	  = toLoginPage;
			this.updateAstronaut  = updateAstronaut;
			// this.authSrv		  = authSrv;

			var astros = this.astronauts
			

			// console.log(this.astronauts);

			// handle token on browser close
			// $window.onbeforeunload = authSrv.deleteTokenOnBrowserClose;
			
			this.selectOptions = [
				{label: "",     field: "", reverse:false},
			 	{label: "Name", field: "name", reverse:false},
			 	{label: "Sex", field: "sex", reverse:false},
			 	{label: "City", field: "city", reverse:false},
			 	{label: "Province", field: "province", reverse:false},
			 	{label: "Notes", field: "notes", reverse:false},
			 	{label: "Pay Info", field: "payInfo", reverse:false},
			 	{label: "Certifications", field: "certifications", reverse:false}
			 	// {values: ["name","sex","city","province", "notes", "payInfo","certifications"]}
			]

			this.isChecked = {
				value: false
			};

			this.checkBoxes = [];

			this.checked = function(index){
				this.isChecked.value = false;
				// console.log("checkbox " + index + " is " + this.checkBoxes[index]);
			}

			// ctrl.select.option = this.selectOptions[0].field;

			function toLoginPage(){
				$location.url('/login');
			}

			function goToAdd(){
				$location.url('/add');
				// console.log('here');
			}



			function clearSearch(field){
			// console.log(this.search[field]);
			// this.search = '';  
			this.search.name ='';
			this.search.sex = '';
			this.search.city = '';
			this.search.province = '';
			this.search.notes = '';
			this.search.payInfo = '';
			this.search.certifications = '';
			this.toInput = '';
			this.messageText = '';
			// this.search[field];
			// console.log(field);

			// 	for ( var i = 0; i < this.select.length; i++){
			// 		this.search[i].field = '';
			// 	}
			}

			function logout(){
				authSrv.logout();
			}

			function lessWaie(){
				$location.hash("email-astros-div");
			}
			function lessEa(){
				$location.hash('email-form-div-container');
			}

			function searchAstronauts(){
				var searchStr = this.search;

				// console.log(searchStr);

				// for( var i = 0; i < astros.length; i++){

				// 	if(this.selectOptions.field = 'sex'){
				// 		// console.log(this.selectOptions.field);

				// 		if(astros[i].sex = this.search){
				// 			// console.log(astros[i].sex);
 
				// 		}
				// 	}
				// }
			}

			// function removePic(){
			// 	console.log(angular.element(this));
			// }

			function updateAstronaut(index){
				var formData = new FormData();

				this.id    = $scope.addForm.id.$$attr.ngValue;
				this.index = $scope.addForm.index.$$attr.ngValue;
				// console.log($scope.addForm.index.$$attr.ngValue);
				var oldAddy =    $scope.addForm.$$element[0][4].placeholder;
				var oldName =    $scope.addForm.$$element[0][0].placeholder;
				var oldSex  =    $scope.addForm.$$element[0][1].value;
				var oldPhone =   $scope.addForm.$$element[0][3].placeholder;
				var oldEmail  =  $scope.addForm.$$element[0][2].placeholder;
				var oldCity =    $scope.addForm.$$element[0][5].placeholder;
				var oldProvince= $scope.addForm.$$element[0][6].value;
				var oldNotes   = $scope.addForm.$$element[0][7].placeholder;
				var oldCerts   = $scope.addForm.$$element[0][8].placeholder;

				var compArray = [
					this.sex,
					this.province,
					this.addressOne, 
					this.notes,
					this.name, 
					this.certifications,
					this.phone, 
					this.email,  
					this.city
				];

				console.log(compArray[5])
				// compare form with placeholder
				for (var i = 0; i < compArray.length; i ++){
					if(compArray[i] === undefined){
						// console.log(compArray[i]);
						switch(i){
							case 0:
							this.sex        = oldSex;
							break;
							case 1:
							this.province   = oldProvince;
							break;
							case 2:
							this.addressOne = oldAddy;
							break;
							case 3:
							this.notes 		= oldNotes;
							break;
							case 4: 
							this.name 		= oldName;
							break;
							case 5:
							this.certifications = oldCerts;
							break;
							case 6:
							this.phone 	 	= oldPhone;
							break;
							case 7:
							this.email 		= oldEmail;
							break;
							case 8:
							this.city 		= oldCity;
							break;
						}
					}
				}
					// else{
					// 	// isDefined.push(true);
					// }

					// if (compArray[i] === compArray[i-1]){
					// 	switch(i){
					// 		case 1;
					// 		this.addressOne = compArray[i-1];
					// 	}
					// 	console.log(compArray[i], compArray[i-1]);
					// 	isMatchArray.push(true);
					// }
					// else {
					// 	isMatchArray.push(false);
					// 	// this.addressOne = compArray[i];
					// }
				
				// for ( var j = 0; j < isMatchArray.length; i++){
				// 	if (isMatchArray[i] === true){

				// 	}
				// }
				console.log(this.index)
				formData.append('insystem', this.insystem)
				formData.append('file', this.file);
				formData.append('name', this.name);
				formData.append('email', this.email);
				formData.append('phone', this.phone);
				formData.append('sex', this.sex);
				formData.append('addressOne', this.addressOne);
				formData.append('city', this.city);
				formData.append('province', this.province);
				formData.append('notes', this.notes);
				formData.append('certifications', this.certifications);
				formData.append('id', this.id);
				formData.append('index', this.index);

				// $('input#id-input').attr('value', $scope.ctrl.astronauts[2]._id);
				// console.log(this.id);
				console.log(index);
				apiSrv.request('/updateAstronaut', formData, 'POST')
				// this.clearFields();
					.then(function(res){
						// console.log(res.data);
						 // var responseData = res;
						 // responseData = res;
						// console.log(res);
						$scope.ctrl.name = res.data.name;
						return console.log(res);
					}, function(responseData){
						return console.log(responseData);
					});

					// console.log(responseData);
					

				this.file = undefined;
				this.name = undefined;
				this.sex  = undefined;
				this.addressOne = undefined;
				this.addressTwo = undefined;
				this.city = undefined;
				this.province = undefined;
				this.notes =  undefined;
				this.certifications = undefined;
				this.payInfo = undefined;
			}

			function clearFields(){
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
			}

			function emailAstros(){
				var formData = new FormData();
				var fileToEmail='';
				var nameToEmail='';
				var children = '';
				var attachment = [];
				formData.append('to', this.toInput);
				formData.append('from', this.fromInput);
				formData.append('message', this.messageText);

				var eb = /\//;
				var ews = /%20/g;

				// formData.append()
				
				// console.log(this.fromInput);

				// get attachments
				// ##################
				$("#emailUl").children().children().children().each(function(index){

					// console.log($(this));
					children = $(this);

					if (children.is('img') ){

						fileToEmail = children.attr('src');
						// console.log(fileToEmail);
						var bs = fileToEmail.lastIndexOf("/assets");
						var fileNameLength = fileToEmail.length;
						fileToEmail = fileToEmail.substring(bs, fileNameLength);
						fileToEmail = fileToEmail.replace(ews, ' ');
						// console.log("fileToEmail %s", fileToEmail);

					} else if (children.is('.astro-name')){
						nameToEmail = children.text();
						// console.log(nameToEmail);
					}

					if(fileToEmail && nameToEmail){
						// attachment.push({'name': nameToEmail, 'file': fileToEmail});	
						// send this string to 
						console.log(typeof fileToEmail);
						console.log(fileToEmail.length);
						var fileNameType = formData.get('fileName');
						// Object filePath_astroName = fileToEmail + "|" + nameToEmail;
						var filePath_astroName = [fileToEmail + "|" + nameToEmail];

						console.log(filePath_astroName);
						formData.append('fileName', filePath_astroName);
						fileToEmail = '';
						nameToEmail = '';

					}
						// attachment = string(attachment);
					// console.log( attachment[i].name);
					//formData.append('attachmentName', nameToEmail);
					
						// formData.append('name', nameToEmail)
				});
				// console.log(attachment[0]);
				// formData.append('attachment', attachment);
				console.log(formData.get('fileName'));
				emailSrv.sendMail(formData);

					$( '.load-text' )
					.css( 'visibility', 'visible' );

				$timeout(function(){
					$( '.load-text' )
					.css( 'visibility', 'hidden' );
				},2000);

					// $( '.load-text' )
					// .css( 'visibility', 'hidden' );


				// $rootScope.$on("httpResponse", function(event, args){
				

				// console.log("event %s", event);
				// console.log("args %s", args);

				// $( '.load-pic' )
				// 	.css( 'visibility', 'hidden' );

				// })
			}			

			// var binary ='';
			// for ( var i = 0; i < this.astronauts.length; i++){
			// 	var buffer = this.astronauts[i].picture.data.data;
			// 	var bytes  = new Uint8Array(buffer);
			// 	var len    = bytes.length;

			// 	for (var j = 0; j < len; j++){

			// 		binary +=  String.fromCharCode(bytes[j ]);
			// 	}

			// 	var pos = binary.search("app");

			// 	console.log(pos);

			// 	binary = binary.substring(pos + 4, binary.length);

			// 	console.log(binary);
			// 	this.image = binary;

			// }





			// function arrayBufferToBase64(buffer){

			// 	return window.btoa(binary);
			// }

	
			// console.log(initAstronauts.picture.data);


		}
})();
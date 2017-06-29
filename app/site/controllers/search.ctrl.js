(function(){
	angular
		.module('blastApp')
		.controller('SearchController', SearchController);

		function SearchController($window,initAstronauts, $timeout, authSrv, $scope, emailSrv, $location, username, $rootScope){
			
			// Set the background
			$('body').css('background-image','url("../assets/img/search-bg.jpg")');
			$('body').css('background-position', 'center');

			// Check for the login token
			var token = localStorage.getItem('authToken');
			authSrv.isLoggedIn(token);

			// Set Properties
			this.astronauts 	  = initAstronauts;
			// this.displayPicture= displayPicture;
			// this.arrayBufferToBase64 = arrayBufferToBase64;
			// this.updateData    = updateData;
			this.emailAstros 	  = emailAstros;
			this.searchAstronauts = searchAstronauts;
			this.clearSearch      = clearSearch;
			// this.removePic		  = removePic;
			this.goToAdd		  = goToAdd;
			this.username		  = username;
			this.logout			  = logout;
			this.toLoginPage	  = toLoginPage;
			// this.authSrv		  = authSrv;

			var astros = this.astronauts
			

			// console.log(this.astronauts);

			// handle token on browser close
			// $window.onbeforeunload = authSrv.deleteTokenOnBrowserClose;
			
			this.selectOptions = [

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

						formData.append('fileName', fileToEmail + "|" + nameToEmail);
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
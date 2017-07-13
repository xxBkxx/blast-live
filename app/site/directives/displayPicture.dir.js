angular
	.module('blastApp')
	.directive('displayPicture',  function(astronautSrv){
	
	function link(scope, element, attrs){
		// console.log('this');
		scope.displayPicture = function(index, chkbxValue){
		
		var parentElement = '';

		//console.log(scope.ctrl.checked.value);	
		// console.log("displayPicture");
		// console.log(scope.ctrl.astronauts);
		// console.log($(".pic-li").children().children()[index]);
		// console.log(index);
			if (chkbxValue == "display"){
			// Get the elements with the profile pic in it
			var emailPic = $(".pic-li").children().children()[index]
			
			console.log(chkbxValue);
			// console.log($(".pic-li").children());
			var emailSrc = emailPic.src;
			
			// To Binary   
			var binary = '';
			
			// console.log(scope.ctrl.astronauts)

			// regEx to format the src strings
			var re = /\//g;
			var spaceRe = /%20/g;
			
			// From binary to Char
			for (var i = 0; i < scope.ctrl.astronauts.length; i++){
				var buffer = scope.ctrl.astronauts[i].picture.data.data;
				var bytes  = new Uint8Array(buffer);
				var len    = bytes.length;

				for (var j = 0; j < len; j++){
					binary +=  String.fromCharCode(bytes[j]);
				}
					var pos = binary.search("blast-live");
					binary = binary.substring(pos + 15, binary.length);
					var assetPos = emailSrc.search("assets");
					if(emailSrc.search(re) != -1){

						emailSrc = emailSrc.substring(pos + 19, emailSrc.length);
						emailSrc = emailSrc.replace(re, "\\");
						if(emailSrc.search(spaceRe) != -1){
							emailSrc = emailSrc.replace(spaceRe, " ");
						}
						// console.log(name);
						// console.log(emailSrc);
					}

				console.log(emailSrc);			
				// Get the name of the profile from matching the file names with the ones in the database
				if (binary == emailSrc){
					// console.log('match');
					var name = scope.ctrl.astronauts[i].name;
					console.log(name);
				}
			}
					//console.log(element.children().children());

			// ################## binary to char end #############################
				
			//  Check whether the pic is there or nah
				var picIsThere = undefined;
				var listItem = "<li><img class='email-pic' src='" + emailPic.src + "'></li><li class='li-centre'><span>"+ name + "</span></li>"
				angular.forEach(element.children().children(), function(child){
						var className = child.className;
						// console.log( className );
					if (className == 'pic-index'){
						
						if(child.innerText == index){
							picIsThere = true;
						}else{
							picIsThere = false;

						}

					}
					// for (var j = 0; j < child.children.length; j++){
					// 	if (child[j] = 
					// }
					// if(child){
					// 	console.log('span');
					// }
					// if(child = listItem ){
					// 	console.log("duplicate picture");
					// }
				})

				if (picIsThere == false || picIsThere == undefined){
					element.prepend("<li><span class='pic-index'>" + index + "</span><img ng-click='ctrl.removePic()' class='email-pic' src='" + emailPic.src + "'><span class='astro-name'>"+ name + "</span></li>");
				} else {
					return
				}
			}else if (chkbxValue == "remove"){

				angular.forEach(element.children().children(), function(child){
						var className = child.className;
						console.log(child.parentElement);

					if (className == 'pic-index'){
						parentElement = child.parentElement;
						// picIsThere
						// console.log(element.children());
						// element.remove(child.parentElement);

						if(child.innerText == index){
							console.log(child.innerText)
							picIsThere = true;
						}else{
							picIsThere = false;
						}

					}
				})
				if(picIsThere == true){
					// $(child.parentElement.remove());
					console.log(parentElement);
					$(parentElement).remove();
					// element.remove(parentElement);
				}
			}
		}
	}
		return{
			restrict: 'EA',
			link: link 
		}
});
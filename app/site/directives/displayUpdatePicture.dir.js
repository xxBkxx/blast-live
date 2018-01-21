angular
	.module('blastApp')
	.directive('displayUpdatePicture',  function(astronautSrv){
	
		function link(scope, element, attrs){
			// console.log('this');
			scope.displayUpdatePicture = function(index){

				// console.log(scope.ctrl.checkBoxes[index].value);
				// insert picutre
				if (scope.ctrl.checkBoxes[index].value === 'displayUpdatePic'){
					var binary='';
					var buffer = scope.ctrl.astronauts[index].picture.data.data;
					var bytes  = new Uint8Array(buffer);
					var len    = bytes.length;
					var defaultPic = 'assets/img/default-link.png';
					
					// console.log(index);
					console.log(scope);
					// console.log(scope.ctrl.astronauts[index].picture.data.data);


					for (var i = 0; i < len; i++){
						binary += String.fromCharCode(bytes[i]);
					}	
					// console.log(binary);
					var pos = binary.search('blast-live');
					binary = binary.substring(pos + 15, binary.length);
					// console.log(binary);
					console.log($(".update-default-pic").removeAttr('src'));
					$(".update-default-pic").removeAttr('src');
					$('.update-default-pic').attr('src', binary);
				} 
				// remove picture
				else if (scope.ctrl.checkBoxes[index].value === 'removeUpdatePic'){
					$('.update-default-pic').removeAttr('src');
					$('.update-default-pic').attr('src', '../../assets/img/default-link.png' );
					$('input#update-name-input').attr('placeholder','');
					$('select#update-sex-select').val('');
					$('select#update-city-select').val('');
					$('input#email-input').attr('placeholder','');
					$('input#phone-input').attr('placeholder','');
					$('input#address-input').attr('placeholder','');
					$('input#update-city-input').attr('placeholder','');
					$('textarea#note-txt').attr('placeholder', '');
					$('textarea#cert-txt').attr('placeholder', '');
				}

				// Fill in the inputs 
				console.log(scope.addForm.index.$$attr.ngValue);
				$('input#update-name-input').attr('placeholder',scope.ctrl.astronauts[index].name);
				$('select#update-sex-select').val(scope.ctrl.astronauts[index].sex);
				$('select#update-city-select').val(scope.ctrl.astronauts[index].province);
				$('input#email-input').attr('placeholder',scope.ctrl.astronauts[index].email);
				$('input#phone-input').attr('placeholder',scope.ctrl.astronauts[index].phone);
				$('input#address-input').attr('placeholder',scope.ctrl.astronauts[index].addressOne);
				$('input#update-city-input').attr('placeholder',scope.ctrl.astronauts[index].city);
				$('textarea#note-txt').attr('placeholder', scope.ctrl.astronauts[index].notes);
				$('textarea#cert-txt').attr('placeholder', scope.ctrl.astronauts[index].certifications);
				// $('input#id-input').val(scope.ctrl.astronauts[index]._id);
				// $('input#index-input').val(index);
				// get the _id value
				scope.addForm.id.$$attr.ngValue = scope.ctrl.astronauts[index]._id;
				scope.addForm.index.$$attr.ngValue = index;
				console.log(scope.addForm.index.$$attr.ngValue);

				// $('input#id-input').attr('autofocus', true);
				// console.log(scope.addForm.id);

				// scope.addForm.id.$touched = true;
				// scope.addForm.id.$untouched = false;
				// angular.forEach(scope.addForm, function(field) {
    // 				// console.log(field);
				// });	

			}
		}
		return{
			restrict: 'EA',
			link: link 
		}
	});
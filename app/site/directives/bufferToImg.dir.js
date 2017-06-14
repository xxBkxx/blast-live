angular
	.module('blastApp')
	.directive('bufferToImg',  function(astronautSrv){
	
	function link(scope, element,attrs){
		
		var binary = '';
		var buffer = scope.astronaut.picture.data.data;
		var astronaut = scope.astronaut;
		var bytes  = new Uint8Array(buffer);
		var len = bytes.length;

		for (var i = 0; i < len; i++){
			binary +=  String.fromCharCode(bytes[i]);
		}

		var pos = binary.search("app");
		binary = binary.substring(pos + 4, binary.length);

		// console.log(binary);
		// scope.image = binary;
		astronautSrv.getAstronaut(astronaut);
		// scope.astronaut.picture.data.data.tempImg = binary;
		element.append("<img class='profile-pic' src='" + binary + "'>")
	}
	return{
		restrict: 'EA',
		link: link 
	}
});


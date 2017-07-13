angular
	.module('blastApp')
	.directive('bufferToImg',  function(astronautSrv){
	
	function link(scope, element,attrs){
		
		var binary = '';
		var buffer = scope.astronaut.picture.data.data;
		var astronaut = scope.astronaut;
		var bytes  = new Uint8Array(buffer);
		var len = bytes.length;

		// console.log(buffer);

		for (var i = 0; i < len; i++){
			binary +=  String.fromCharCode(bytes[i]);
		}

		var pos = binary.search("blast-live");
		binary = binary.substring(pos + 11, binary.length);

		// console.log("bin %s", binary);
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


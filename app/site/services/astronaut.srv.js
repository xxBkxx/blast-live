(function(){
	angular
		.module('blastApp')
		.service('astronautSrv', astronautSrv);

		function astronautSrv(apiSrv){
			var self = this;
			
			self.initAstronauts = initAstronauts;
			self.getAstronaut   = getAstronaut;

			function initAstronauts(){
				return apiSrv.request('/initAstronauts', {}, 'GET')
				// .then(function(res){
				// 	// return function(res){
				// 	// 	astronauts = astronautSrv.initAstronauts();
				// 	// 	console.log(astronauts);
				// 	// 	for ( var i = 0; i < this.astronauts.length; i++){
				// 	// 		var buffer = this.astronauts[i].picture.data.data;
				// 	// 		var bytes  = new Uint8Array(buffer);
				// 	// 		var len = bytes.length;

				// 	// 		console.log(buffer);

				// 	// 		for (var i = 0; i < len; i++){

				// 	// 			binary +=  String.fromCharCode(bytes[i]);
				// 	// 		}

				// 	// 		var pos = binary.search("app");

				// 	// 		console.log(pos);

				// 	// 		binary = binary.substring(pos + 4, binary.length);

				// 	// 		console.log(binary);
				// 	// 		this.image = binary;

				// 	// 	}
				// 	// }
				// })
				.then(function(res, error){
					if (res.status == 200) {
						return res.data;
					}else if(res.status == 400){
						return console.log(error);
					}

				})
			}

			// Dont need this service
			function getAstronaut(astronaut){
				// console.log(astronaut);
			}
		}
})();
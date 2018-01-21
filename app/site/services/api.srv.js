(function(){
	angular
		.module('blastApp')
		.service('apiSrv', ApiService);

		function ApiService($http){
			var self = this;

			var BASE_URL = '/api';

			self.request = request;

			function request(endpoint, data, method){

				// console.log(data);

				if (method == 'GET'){
					// data = JSON.stringify(data);
					return $http.get(endpoint, data)
				}

				if (method == "POST"){

					// Test whether or not data is an object or nah
					// `````````````````````````````````````````````
					if (data !== null && typeof data === "object"){
						// console.log('fdata');
							// data = JSON.stringify(data);
							// console.log(data);
							return $http.post(endpoint, data,{
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						})
					} else if (data === null){
							console.log('its = to token');
							console.log(typeof data);
							// data = '';
							// console.log(typeof data);
							// data = JSON.stringify(data);
							// console.log("data is not a string");
							data = JSON.stringify(data);
							return $http.post(endpoint, data, {
								transformRequest: angular.identity,
								headers: {'Content-Type': 'text/html'}
							})
					}
				}
			}

	        function formatGetData(data){
	        	
	            var data_string = '?';
	            for(item in data){
	                if(data_string == '?'){
	                    data_string += item+'='+encodeURIComponent(data[item]);
	                }
	                else{
	                    data_string +='&'+item+'='+encodeURIComponent(data[item]);
	                }
	            }
	            if(data_string == '?'){
	            	return '';
	            }
	            return data_string;
	        }
		}
})();
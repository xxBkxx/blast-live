(function(){
	angular
		.module('blastApp')
		.service('apiSrv', ApiService);

		function ApiService($http){
			var self = this;

			var BASE_URL = '/api';

			self.request = request;

			function request(endpoint, data, method){
				if (method == 'GET'){
					data = JSON.stringify(data);
					return $http.get(endpoint, data)
				}

				if (method == "POST"){

					return $http.post(endpoint, data,{
						transformRequest: angular.identity,
						headers: {'content-Type': undefined}
					})
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
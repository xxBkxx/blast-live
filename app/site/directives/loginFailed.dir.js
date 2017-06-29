angular
	.module('blastApp')
	.directive('loginFailed', function($rootScope){
	
	function link(scope, element,attrs){
		// console.log("bufferToImg");
		// console.log('here');
		// $('.login-message').css('visibility', 'hidden');

		$rootScope.$on('httpResponse', function(event, args){
			
			console.log('detected');
			console.log(args);

		element.append("<p class='failed-message'>" + args.data.message + "</p>")
		});
	}
	return{
		restrict: 'E',
		link: link 
	}
});
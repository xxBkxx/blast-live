angular
	.module('blastApp')
	.directive('notAuthorized', function(AUTH_EVENTS, $location, $rootScope){

	return{
		restrict: 'AC',
		// template:	'<div class="login-message">' + 
		// 			'<p class="vertical-align horizontal-centre">' + 
		// 			'<a ng-click="toLoginPage()"' + 
		// 			'class="signup-link">Please login</a>' +
  //           		'</p></div>',

		link: function(scope, element, attrs){
			console.log(scope);
			// var isClickable = angular.isDefined(attrs.isClickable) && scope.$eval(attrs.isClickable) === true ? true : false;

			// scope.toLoginPage = function(){

			// 	if (isClickable) return 
			// 		// $('.login-message').css('display', 'block')

			// 		// console.log('tologin');
					
			// 		$location.url('/login');
			// 		// $(this).unbind('body').s
			// }

			scope.$parent.$on(AUTH_EVENTS.notAuthenticated, function(event, state){
					element.css('display', 'block');
					element.parent().css('overflow-x', 'hidden');
					element.parent().css('overflow-y', 'auto');

				// event.preventDefault();
				
			} 
				// var curr_location = $location.path();
					// document.getElementById('myField').disabled = true;
					// disable the fucking form elements
					// console.log(scope),

					// document.getElementsByClassName('login-message').style.color =  'block'	
					// console.log(scope)
					// $(".login-message").remove()
					// scope.isDisabled = true;
					// $("body").append(
					// 	'<div class="login-message">' + 
					// 	'<p class="vertical-align horizontal-centre">' + 
					// 	'<a ng-click="ctrl.toLoginPage()"' + 
					// 	'class="signup-link">Please login</a>' +
				 //        '</p></div>',
					// )
			);

			// scope.$on(AUTH_EVENTS.notAuthorized, function(event,next){
			// 	var curr_location = $location.path();

			// 	if (curr_location !== '/login'){
			// 		console.log('notAuthorized');
			// 		event.preventDefault();
			// 		$("body").append(
			// 			'<div class="login-message">' + 
			// 			'<p class="vertical-align horizontal-centre">' + 
			// 			'<a ng-click="ctrl.toLoginPage()"' + 
			// 			'class="signup-link">Please login</a>' +
	  //           		'</p></div>',
			// 		)
			// 	}
   //          });	// console.log('notAuthDir');
		}
	}
});

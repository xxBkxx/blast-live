angular
	.module('blastApp')
	.directive('uploadDirective', ['$parse', function($parse){
	
	var link = function(scope, element,attrs){
		// console.log("bufferToImg");
		var model 		= $parse(attrs.uploadDirective);
		var modelSetter = model.assign;

		// console.log(attrs);
		element.bind('change', function(){
			scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			});
		});
	}
	return{
		restrict: 'A',
		link: link 
	}
}]);


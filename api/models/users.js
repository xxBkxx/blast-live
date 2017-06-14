var mongoose 		  = require('mongoose');
var Schema 			  = mongoose.Schema;
var userSchema  	  = new Schema({

	name:     String,
	email:    String,
	password: String,
	created:  {type: Date, default: Date.now}

});

var user = mongoose.model('user', userSchema);

module.exports = user;

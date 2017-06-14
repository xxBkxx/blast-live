var mongoose 		  = require('mongoose');

var Schema 			  = mongoose.Schema;
var astronautSchema   = new Schema({

	picture: 		{data: Buffer, contentType: String},
	name:           String,
	sex:      		String,
	addressOne:   	String,
	addressTwo:     String,
	city:           String,
	province: 	    String,
	notes:          String,
	certifications: String,
	payInfo:        String,
	created:        {type: Date, default: Date.now}

});

var astronaut = mongoose.model('astronaut', astronautSchema);

module.exports = astronaut;

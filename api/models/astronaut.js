var mongoose 		  = require('mongoose');

var Schema 			  = mongoose.Schema;
var astronautSchema   = new Schema({

	picture: 		{data: Buffer, contentType: String},
	insystem:       String,
	name:           String,
	email: 			String,
	phone: 			String,
	sex:      		String,
	addressOne:   	String,
	city:           String,
	province: 	    String,
	notes:          String,
	certifications: String,
	index: 			String,
	// payInfo:        String,
	created:        {type: Date, default: Date.now}

});

var astronaut = mongoose.model('astronaut', astronautSchema);

module.exports = astronaut;

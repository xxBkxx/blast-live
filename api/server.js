var express    = require('express');
var app 	   = express();
var authentication = require("./middleware/auth");

var mongoose   = require('mongoose');

var astronaut_routes = require("./routes/astronaut_routes");
var email_routes     = require('./routes/email_routes');
var auth_routes 	 = require('./routes/auth_routes');
var user_routes 	 = require('./routes/user_routes');
var forgot_routes    = require('./routes/forgot_routes');
var new_password 	 = require('./routes/newpassword_routes')
// var anonymous_routes = require('./routes/anonymous_routes')

app.use("/", astronaut_routes);
app.use("/", email_routes);
app.use("/", auth_routes);
app.use("/", user_routes);
app.use('/', forgot_routes);
app.use('/', new_password);
// app.use('/', authentication, anonymous_routes)

// console.log(__dirname + "/../app/");
var port = process.env.PORT || 8080;
app.use(express.static(__dirname + './../app', {redirect: true}));
	
if (port = 8080){

	app.listen(8080, function(){
		console.log('Listening on Port 8080');
		console.log('Press CTRL + C to stop server');
	});

}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/data/db');
var db 		 = mongoose.connection;
db.on('error', console.error.bind(console, 'connection Error:'));
db.once('open', function(){
		console.log('connected to db at /data/db');

	// Drop the db----------------------
	// mongoose.connection.db.dropDatabase(function (err) {
	//   console.log('db dropped');
	//   // process.exit(0);
	// });
	// ----------------------------
	
});



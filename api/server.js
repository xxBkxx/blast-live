var express    = require('express');
const https    = require('https');
const http     = require('http');
const fs 	   = require('fs');
var app 	   = express();
var path       = require('path');
var mongoose   = require('mongoose');
var body_parser 	  = require('body-parser');
var urlencoded_parser = body_parser.urlencoded({extended: false});
var json_parser	      = body_parser.json();
var text_parser	      = body_parser.text({ type: 'text/html' });
var raw_parser		  = body_parser.raw();

app.use(urlencoded_parser);
app.use(json_parser);

var authentication   = require("./middleware/auth");

var astronaut_routes = require("./routes/astronaut_routes");
var email_routes     = require('./routes/email_routes');
var auth_routes 	 = require('./routes/auth_routes');
var user_routes 	 = require('./routes/user_routes');
var forgot_routes    = require('./routes/forgot_routes');
var new_password 	 = require('./routes/newpassword_routes');
// var add_route		 = require('./routes/add_routes');
var favicon_route	 = require('./routes/favicon_routes');
// var not_login_regex  = /\/(?!login)/g;

// var anonymous_routes = require('./routes/anonymous_routes')

// app.all('*', authentication);
// app.use('/', authentication);
var not_login_regex  = /\/(?!login|assets|site|css|app.js)[\w\d]{1,}(?!login)/g;

// app.use( authentication);
// app.use('/choice_route', authentication);
app.use("/", favicon_route);
// app.use('/token', authentication);
// app.use('/', add_route);
app.use("/", astronaut_routes);
app.use("/", email_routes);
app.use("/", auth_routes);
app.use("/", user_routes);
app.use("/", forgot_routes);
app.use("/", new_password);
// app.use( authentication);
// app.use("/", authentication);

// app.use('/', authentication, anonymous_routes);

// console.log(__dirname + "/../app/");

// https secure connection ###########
// app.get('/', function(req,res){
// 	res.send("hello World");
// bitnami);

// app.set('port_https', 8443);

// app.use( function(req,res, next){
	
// 	if(req.secure){
// 		console.log('next');
// 		console.log('the url is %s', req.url);
// 		// res.send("harlem World");
// 		return next();
// 	} else if(!req.secure){

// 	res.redirect("https://" + req.hostname + req.url );
// 	console.log(req.hostname, req.url);

// 	}
// });

// production port is 3000
// var port = process.env.PORT || 8080; 
var port = process.env.PORT || 3000; 
// console.log(__dirname);

// console.log(process.env);


// The original express Connection String ########
app.use(express.static(__dirname + './../app', {redirect: true}));

// For the bueatification of the url
app.use('*', function(req,res,next){
	var indexFile = path.resolve(__dirname + '/../app/index.html');
	res.sendFile(indexFile);
})

// app.listen(port, function(){
// 		console.log('Listening on Port %s', port);
// 		console.log 	('Press CTRL + C to stop server');
// });


// ssl files!!!$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	const options = {
		key:  fs.readFileSync('blast.key'),
		cert: fs.readFileSync('blast.crt')
	// ca:   fs.readFileSync('../blast.crt'),
	// requestCert: true,
	// rejectUnauthorized: false
};

// live server connections
var insecureServer = http.createServer(app).listen(3000);

// live server connections
var secureServer   = https.createServer(options, app).listen(8443);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://blastAdmin:tmdpw0418@ec2-34-214-245-248.us-west-2.compute.amazonaws.com/blast-db');
// mongoose.connect("localhost/data/db");
var db 		 = mongoose.connection;
db.on('error', console.error.bind(console, 'connection Error:'));
db.once('open', function(){
		console.log('localhost');

	// Drop the db----------------------
	mongoose.connection.db.dropDatabase(function (err) {
	  console.log('db dropped');
	  // process.exit(0);
	});
	// ----------------------------
	
});



var express    = require('express');
const https    = require('https');
const http     = require('http');
const fs 	   = require('fs');
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
// app.use('/', authentication, anonymous_routes);

// console.log(__dirname + "/../app/");

// https secure connection ###########
// app.get('/', function(req,res){
// 	res.send("hello World");
// });

app.set('port_https', 8443);

// app.all('*', function(req,res, next){
	
// 	if(req.secure){
// 		// console.log(app);
// 		// res.send("harlem World");
// 		return next();
// 	};

// 	console.log('next');
// 	res.redirect("https://" + req.hostname + ":" + app.get('port_https') + req.url);
// 	// res.redirect("https://localhost:" + app.get('port_https') + req.url)
// 	console.log(req.url);
// });

var port = process.env.PORT || 8080;

// The original express Connection String ########
app.use(express.static(__dirname + './../app', {redirect: true}));

app.listen(port, function(){
		console.log('Listening on Port 80');
		console.log('Press CTRL + C to stop server');
});

const options = {
	key:  fs.readFileSync('../private.key'),
	cert: fs.readFileSync('../certificate.pem')
	// ca:   fs.readFileSync('../blast.crt'),
	// requestCert: true,
	// rejectUnauthorized: false
};

// var insecureServer = http.createServer(app).listen(8080);

// var secureServer = https.createServer(options, app,(req,res) => {
// 	console.log(app);
// 	// res.end(app);
// 	res.writeHead(200);
// 	res.send("hellp world");
// }).listen(8443);

// var secureServer = https.createServer(options, app).listen(8443);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://bkdixxon:tmmpw0418@ec2-52-40-8-179.us-west-2.compute.amazonaws.com/db');
// mongoose.connect("mongodb://localhost/data/db");
var db 		 = mongoose.connection;
db.on('error', console.error.bind(console, 'connection Error:'));
db.once('open', function(){
		console.log('localhost');

	// Drop the db----------------------
	// mongoose.connection.db.dropDatabase(function (err) {
	//   console.log('db dropped');
	//   // process.exit(0);
	// });
	// ----------------------------
	
});



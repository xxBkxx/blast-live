'use strict';

var	nodemailer 	 	 = require('nodemailer');
var router 	     	 = require('express').Router();
var multer     		 = require('multer');
var users 			 = require('.././models/users');
var jwt				 = require('jsonwebtoken');
var config			 = require("./../config/config.json");
var upload			 = multer();

var new_token = '';

// console.log("service client %s", config.SERVICE_CLIENT);

router.post('/sendForgotMail', upload.any(),  function(req, res, next){
	// console.log(req.body);
	// var fromField = req.body.from;
	// var toField   = req.body.to;
	// var message   = req.body.message;
	// var fileName  = req.body.fileName;
	// var pipeMorePos = '';
	// var stringLen   = '';
	// var name      = '';
	// var filePath  = '';
	// var filePathAry = [];
	// var nameAry 	= [];
	console.log(req.body);
	var email = req.body.email;


	users.findOne({'email': email}, function(err, user){

	console.log("user %s", user);

	// Error Check
	if(err){
		return res.status(400).send({err:err});
	} else if (!user){

		return res.status(401).send({message: "That email address isn't recongnized"})

	} else if ( user != undefined){

		var name = user.name;
		name = name.toUpperCase();
		//TODO Find a different thing (EPV)
		jwt.sign({ 
			// exp: Math.floor(Date.now() / 1000) + (60 * 60),
			iss:  "ImajinMedia",
			// jtid: "singleuse",
			data: email
		},'expropositovivo',{expiresIn:"1h"}, function(err,token){
			new_token = token; 

					// send the email
			let transporter = nodemailer.createTransport({
			service: 'gmail',
			host:    'mail.gmail.com',
			secure: true,
			// port: 465,
			auth:{
					// XOAuth2:{
					// type: 		   config.TYPE,
					user: 	  	   config.USER,
					pass:    	   config.PASS,
					// scope: 		   config.scope,
					// port:          config.PORT,
					// grant_type:    config.grant_type,
					// (client ID)serviceClient: "116003676217720649742",
					// serviceClient: "497763768793-q5vano807tavq7fgub0352knmgp99mci.apps.googleusercontent.nC0YVtpqD6mMNveQ91DqdDTrbpSXlWaWemOR",
					// clientId: config.SERVICE_CLIENT,
					// privateKey:    config.PRIVATE_KEY,
					// clientSecret: "3yA4UUfJbujqUyeF0ZmSZBPu",
					// clientSecret:  config.CLIENT_SECREsT,
					// refreshToken:  config.REFRESH_TOKEN
					// accessToken:   config.ACCESS_TOKEN,
					// accessUrl: 	   config.ACCESS_URL
					// expires:   1484314697598
				 // 	// // pass:'Tmgpw0418#'
				// }
			}
		});

		console.log("newtoken %s", new_token);

		let mailOptions = {
			from:         'blastmailer@gmail.com',

			// TODO #2: Set the to field to body.email
			to:           email,
			subject:      "BLAST--Password Reset",
			
			// ToDO #1: Don't forget to attach a url here
			text: "Hey " + name + " reset you password here http://blast.imajin.media/#!/setPassword?tkn=" + new_token,
			html: "Hey " + name + " you can <a href='http://blast.imajin.media/#!/setPassword/" + new_token + "'>rest your password here</a>" + "\n\n" +
				  "The link expires in an hour so make it snappi pappi." 
			
		};

		transporter.sendMail(mailOptions, (error, info)=>{
			if (error){
				return console.log(error);
			}

			console.log(info);
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
			
		});



		return res.status(200).send({message: "Message sent"});

	}

	})

})

module.exports = router;
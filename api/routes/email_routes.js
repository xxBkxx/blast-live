'use strict';
var	nodemailer 	 = require('nodemailer');
var router 	     	 = require('express').Router();
var multer     		 = require('multer');
var config			 = require("./../config/config.json")
var upload			 = multer();

console.log("service client %s", config.SERVICE_CLIENT);

router.post('/email', upload.any(),  function(req, res, next){
	
	// console.log(req.body);

	var fromField = req.body.from;
	var toField   = req.body.to;
	var message   = req.body.message;
	var fileName  = req.body.fileName;
	var pipeMorePos = '';
	var stringLen   = '';
	var name      = '';
	var filePath  = '';
	var filePathAry = [];
	var nameAry 	= [];
	var mailOptions = '';


	// console.log(req.body);

	// console.log('nodemailer %s', nodemailer);
	// var attachment = req.body.attachment;
	// var attachmentName = req.body.attachment;

	for (var i = 0; i < fileName.length; i++){

		// Format the req.body string
		pipeMorePos = fileName[i].indexOf("|");
		stringLen   = fileName[i].length;
		name 		= fileName[i].substring(pipeMorePos + 1, stringLen)
		filePath 	= fileName[i].substring(fileName[i].charAt(0), pipeMorePos );
		
		filePathAry.push(filePath);
		nameAry.push(name.toUpperCase());

		// console.log("filePathAry %s", filePathAry.length);

		// console.log("name %s | file path %s", name, filePath);
		
	}

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
				// expires:  	   1494388182480,	
				// accessUrl: 	   config.ACCESS_URL
				// expires:   1484314697598
			 // 	// // pass:'Tmgpw0418#'
			// }
		}
	});

	// transporter.set('oauth2_provision_cb', (user, renew, callback)=>{

	// 	var userTokens = [];
	// 	console.log(user, renew);

	//     let accessToken = userTokens[user];

	//     if(!accessToken){
	//         return callback(new Error('Unknown user'));
	//     }else{
	//         return callback(null, accessToken);
	//     }
	// });


	for ( var j = 0; j < filePathAry.length; j++){


		// Set up emailer##############################
		// 		############################################

		console.log("filePath %s", filePathAry[j]);




		// console.log(transporter);

		transporter.on('token', token => {
			console.log('A new access token was created');
			console.log('User: %s', token.user);
			console.log('access token: %s', token.accessToken);
			console.log('expires:%s', new Date(token.expires));
		});


		let mailOptions = {

			from:         'blastmailer@gmail.com',
			to:           toField,
			subject:      "Blast Astronauts" + "-" + nameAry[j] ,
			text: 		  message,
			// html: "<img src='../.." + filePath +">"    
			attachments:   
			{
				filename: nameAry[j] + "-" + filePathAry[j],
				path:   '../app/' + filePathAry[j] 
			} 

			// auth:{
			// 	// user:       config.USER,
			// 	refreshToken:  config.REFRESH_TOKEN,
			// 	accessToken:   config.ACCESS_TOKEN,
			// 	expires:  	   1494388182480	
			// }

		};
		// console.log(mailOptions);
		transporter.sendMail(mailOptions, (error, info)=>{
			if (error){
				return console.log(error);
			} else{

				console.log('Message %s sent: %s', info.messageId, info.response);
			}	
		});
	}









		// ##################################################################
	
		// console.log(filePathAry);
		// console.log(nameAry);



})

module.exports = router;


// create reusable transporter object using the defualt SMTP transport

'use strict';

var	nodemailer 	 	 = require('nodemailer');
var router 	     	 = require('express').Router();
var multer     		 = require('multer');
var users 			 = require('.././models/users');
var bcrypt			 = require('bcrypt');
var jwt				 = require('jsonwebtoken');
var config			 = require("./../config/config.json");
var upload			 = multer();

const SALT_ROUNDS = 10;
// const epv         = req.body.password;

// console.log("service client %s", config.SERVICE_CLIENT);

router.post('/setPassword', upload.any(),  function(req, res, next){

	var token = req.body.token;
	var pw    = req.body.PasswordOne;

	// console.log(pw);

	token = token.substring(token.lastIndexOf('/') + 1 , token.length);

	// console.log(token);

	var decoded = jwt.verify(token, "expropositovivo");

	// console.log(decoded);

	bcrypt.genSalt(SALT_ROUNDS, function(err,salt){
		// console.log(salt);
		bcrypt.hash(pw, salt, function(err, hash){
			// console.log(hash);
			if(err){
				res.send({err:err})
			} else if(!err){
				// console.log(hash);
				// {$set:{[decision]: currYea}}
				users.findOneAndUpdate({email: decoded.data}, {$set:{password: hash}}, {new:true},  function(err, user){
			
					if(err){
						console.log(err);
						return res.status(400).send({err: err});
					}

					if (!user){

						return res.status(401).send({Message: "You'd better call Izzo"});
					}

					if(user){
						return res.status(200).json({user});
					}

				})

			}
		})
	})



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

	// bcrypt.genSalt(SALT_ROUNDS, function(err,salt){
	// 	bcrypt.hash(epv, salt, function(err, hash){

	// 	});
	// });

	// req.render('setPassword',{token: req.params});
	// console.log(req.body);

	// res.redirect('/setPassword');
	// console.log("token",req.protocol,req.params ,req.get('host'),req.path);


	// var email = req.body.email;

	// users.findOne({'email': email}, function(err, user){


	// // Error Check
	// if(err){
	// 	return res.status(400).send({err:err});
	// } else if (!user){

	// 	return res.status(401).send({message: "That email address isn't recongnized"})

	// } else if ( user != undefined){


	// 	// var salt = "expropositovivo";

	// 	console.log(user.password);

	// 	return res.status(200).send({message: "Message sent"});

	// }

	// })

})


module.exports = router;
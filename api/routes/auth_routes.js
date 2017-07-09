var	nodemailer 	 	 = require('nodemailer');
var router 	     	 = require('express').Router();
var users			 = require('.././models/users');
var bcrypt			 = require('bcryptjs');
var multer     		 = require('multer');
var jwt				 = require("jsonwebtoken");
var upload			 = multer();

router.post('/login' , upload.any(), function(req, res, next){
	// console.log('logged in');

	// console.log(req.body);
	var pw 		 = req.body.password;
	var userName = req.body.userName;

	console.log(req.body);

	// console.log(userName);

	users.findOne({"email": userName}, function(err, user){

		if(err){

			console.log(err)

			return res.status(400).send({err:err});

		} else if (!user){

			console.log(user);
			return 	res.status(401).send({message:'Are you sure you belong here?'});
		}

			else if (user != undefined){

			var oldPw = user.password;

			bcrypt.compare(pw, oldPw, function(err, result){

				console.log('pw %s oldPw %s', pw, oldPw);

				if(err){

					return res.status(403).json({err:err});

				} else if( result == true ){

					res.status(200)

					user.password = '';
					delete user.password;

					console.log(user);

					var user_obj = {email: user.email, name: user.name};
					var token = jwt.sign(user_obj, 'expropositovivo');

					res.set('authentication', token);
					res.json(user_obj);

				} else if (result == false){
					console.log('result %s', result);
					return res.status(401).send({message:'Wrong password brohta! Try try again!'});
				}
			})

		}
	});


})

module.exports = router;
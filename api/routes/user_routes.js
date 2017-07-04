var router 	     	 = require('express').Router();
var bcrypt			 = require('bcryptjs');
var users			 = require('.././models/users')
var multer     		 = require('multer');
var upload			 = multer();

const saltRounds = 10;
const myPlaintextPassword = "s0/\/\P4$$w0rD";
const someOtherPassword   = 'not_bacon';

router.post('/createUser' , upload.any(), function(req, res, next){
	// console.log(req.body);
	var myPlaintextPassword = req.body.password;
	bcrypt.genSalt(saltRounds, function(err, salt){

		// console.log('genSalt');

		bcrypt.hash(myPlaintextPassword, salt, function(err, hash){

			if (!err){

				var _user = users({
					name:     req.body.name,
					email:    req.body.userName,
					password: hash 
				});

				_user.save(function(err){
					if(err){
						res.status(400)
							.json({err:err})
					}else{
						console.log("user saved")
					}
				})
				
				console.log("user saved %s", _user)
			} else{
					console.log('user signup err');
					console.log(err);
					res.status(400)
						.json({err:err})
			}

		});
	});

	// console.log('creating User');

	// console.log(req.body);

})

module.exports = router;
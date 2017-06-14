var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['authentication'];

	if (token){

		jwt.verify(token, 'expropositovivo', function(err, decoded){

			if (err){

				return res.json({success: false, message: "failed to authenticate"});
			} else{

				req.decoded = decoded;
				next();
			}

		});
	} else {

		return res.status(403).send({

			success: false,
			message: "No token provided"

		});

	}
};
 var jwt = require('jsonwebtoken');
// var multer = require('multer');

module.exports = function(req, res, next){
	// var token = req.body.authToken || req.param('authToken') || req.headers['authentication'];
	// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJrZGl4eG9uQGdtYWlsLmNvbSIsIm5hbWUiOiJicmlhbiIsImlhdCI6MTQ5ODUwMzk3NX0.T9ue_-cR-J8hQYa5kE8ngaolQCms_TkEMhOhyHlD9jw"
	// console.log(req.body);
	var token = '';

	if (token){

		jwt.verify(token, 'expropositovivo', function(err, decoded){

			if (err){

				return res.json({success: false, message: "failed to authenticate"});
			} else{

				// console.log('authenticate');

				req.decoded = decoded;
				next();
			}

		});
	} else {

		return res.redirect(200,"#!/login");

		// return res.status(403).send({

		// 	success: false,
		// 	message: "No token provided"

		// });

	}
};
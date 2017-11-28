var router 	   		 = require('express').Router();
var astronaut 	 	 = require('.././models/astronaut');
var fs 		 		 = require('fs');
// var body   	   		 = require('body-parser');
// var raw	   		     = body.json();
// var urlEncodedParser = body.urlencoded({extended: true})
var multer     		 = require('multer');

// file uploading
// ````````````````````````````
var storage = multer.diskStorage({
	
	destination: function(req, file, callback){
		// callback(null, "home/ubuntu/blast-live/app/assets/img/");
		callback(null, "/../../assets/img/");
	},

	filename: function(req, file, callback){
		var originalName  = file.originalname;
		var fileExtension = originalName.split('.').slice(-1);
		var originalName  = originalName.split('.').slice(0,-1).join('.');
		callback(null, originalName + '-' + Date.now() + '.' + fileExtension);

		// console.log(file)
	}
});

var upload = multer({
	storage: storage,

	// limits:  {fileSize: 10000000},
	// fileFilter: function(req, file, cb){
	// 	// if (file.mimetype !== 'image/jpge' || 'image/')
	// }
});

// console.log(req.files);
// ````````````````````````````````

// var upload = multer ({ dest: 'uploads/'});

router.get('/initAstronauts', function( req,res ){
	astronaut.find(function(error, astronaut){
		if (error){
			res.status(400)
				.json({error:error});
		} else{
			// console.log(astronaut);
			return res.send(astronaut);
		}
	});
})


router.post('/addAstronaut', upload.array('file', 12),  function(req, res){

	
	// Command prompt stuff
	// ```````````````````
	// rl1.question(">>" + console.log(req.file) , function(){
	// 	rl1.close()
	// });
	// ``````````````````
	// upload(req, res, function(err){
	// 	if (err){
	// 		res.send(err);
	// 		console.log(err);
	// 	} 
	// 	res.send('file is upload');
	// });
	// console.log(storage.getFilename());

	// handle the file upload first
	// ````````````````````````````
	// upload(req, res, function(err){
	// 	if (err){
	// 		res.send(err);
	// 		console.log(err);
	// 	}
	// 	res.send('file is uploaded');
	// });

	// console.log(req.body);

	// var picture	 = req.files;
	// var name 	 = req.body.name;
	// var sex  	 = req.body.sex;
	// var addy1 	 = req.body.addy1;
	// var addy2 	 = req.body.addy2;
	// var city 	 = req.body.city;
	// var province = req.body.province;
	// var notes 	 = req.body.notes;
	// var pay 	 = req.body.pay;
	// var certs 	 = req.body.certs;
	// console.log(req.files);
	console.log('req');
	console.log(req);
	var _astronaut = astronaut({

		picture:    	{data: req.files[0].path, contentType: req.files[0].mimetype},
		name: 	  		req.body.name,
		sex:  	  		req.body.sex,
		addressOne: 	req.body.addressOne,
		addressTwo: 	req.body.addressTwo,
		city: 	  		req.body.city,
		province: 		req.body.province,
		notes:    		req.body.notes,
		payInfo:      	req.body.payInfo,
		certifications: req.body.certifications
	})

	// Save the astronaut
	// ````````````````````````````````
	 _astronaut.save(function(err){
		if(err){
			res.status(400);
			console.log({err:err})
		} else{
			// console.log(_astronaut);
			res.send(_astronaut);
				// console.log('saved');
		}
	})

})

module.exports = router;
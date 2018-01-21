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
		callback(null, __dirname + "/../../app/assets/img");
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
	// console.log(__dirname);
	// console.log(req.body);
	var _astronaut = astronaut({

		picture:    	{data: req.files[0].path, contentType: req.files[0].mimetype},
		insystem:       req.body.insystem, 
		name: 	  		req.body.name,
		email: 			req.body.email,
		phone: 			req.body.phone,
 		sex:  	  		req.body.sex,
		addressOne: 	req.body.addressOne,
		// addressTwo: 	req.body.addressTwo,
		city: 	  		req.body.city,
		province: 		req.body.province,
		notes:    		req.body.notes,
		// payInfo:      	req.body.payInfo,
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

router.post('/updateAstronaut', upload.array('file', 12), function(req, res){
	// console.log(req.body);
	obj = req.body;
	console.log(req.body);
	// console.log(Object.prototype.entries(obj));
	var objArray= [];
	// for ( var key in obj){

	// 	if (obj[key] === "undefined"){
	// 		// console.log(obj[key]);
	// 		// obj[key] = 0;
	// 		// console.log(obj[key]);
	// 		delete obj[key];
	// 	} 
	// }
		// console.log(obj["email"]);

		// get the old astronaut to compare to the new one
		astronaut.find({'_id':obj['id']}, function(err, _previousAstronaut){
			var oldKeyArray = []; 
			if (err){
				return console.log(err)
			} else {
				// console.log(_previousAstronaut[0]);
				var oldName = _previousAstronaut[0].name;
				var oldEmail = _previousAstronaut[0].email;
				// for (var oldKey in _previousAstronaut[0]){
				// 	console.log(oldKey);
				// 	oldKeyArray.push(oldKey);
				// }
				// console.log(oldKeyArray);			
			}
		})
		astronaut.findOneAndUpdate(
			{"_id": obj["id"]}, 
			
			{$set: 
				
				{"name": 		   obj["name"], 
				"insystem": 	   obj["insystem"],
				"email": 		   obj["email"],
				"phone": 		   obj["phone"],
				"sex": 		  	   obj["sex"],
				"addressOne": 	   obj["addressOne"],
				"city":   		   obj["city"],
				"province": 	   obj["province"],
				"notes":    	   obj["notes"],
				"certifications":  obj["certifications"],
				'index': 		   obj['index']}
			}, 
			
			{returnNewDocument:true}, 

			function(err, _astronaut){
					// {"province": obj["province"]},
				if(err){
					return console.log(err);
				} else{
					res.send(JSON.stringify(_astronaut.data));
				}
			});
	
	// // angular.forEach(astronaut, function(value, key){
	// // 	console.log(value)
	// 	console.log(req.body);
	// // })		
	// 	id = obj.id;
	// 	// console.log(id);
	// 	for( var key in obj ){
	// 		// console.log(key);
	// 		// console.log(`astronaut.${val} = ${astronaut[val]}`);
	// 		if (obj[key] === 'undefined'){
	// 				// console.log('undefined');
	// 		}

	// 		else if (obj[key] !== "undefined"){

	// 			//var rightKey;
	// 			// var rightKey = Object.keys(obj).filter(function(val){obj[val] === key})[1];
	// 			var rightVal = obj[key];
	// 			// if (key === "id" ){
	// 			// 	return
	// 			// }
				
	// 			// console.log(Object.keys(obj).find(findKeyByVal(obj, val)));
	// 			// console.log(rightVal);
	// 			// console.log("value %", obj.[val]);
	// 			// console.log(${val});
	// 			// record = astronaut.findOneAndUpdate({"_id" : id}, {obj.val})

				
	// 			key = key.trim()
	// 			rightVal = rightVal.trim();
	// 			console.log(key, rightVal);
				
	// 			astronaut.findOneAndUpdate({"_id": id}, {$set: {[key] : rightVal}}, {$returnNewDocument:true}, function(err, _astronaut){
	// 				if(err){
	// 					return console.log(err);
	// 				} else{
	// 					// console.log(_astronaut.email);
	// 					// console.log(_astronaut);
	// 					res.status(200);

	// 					var keyVal = key+rightVal;

	// 					return res.end(JSON.stringify(key));
	// 				}
	// 			})
	// 		}
	// 	}

		// function findKeyByVal(astroObj, astroVal){
		// 	return Object.keys(astroObj).find(key => astroObj[key] === astroVal);
		// }

	// array.forEach (astronaut){
	// 		console.log(item);
	// }
	// for (var i = 0; i < 11: i++){
		// console.log(Object.entries(astronaut))
	// }
	// console.log(Object.values(astronaut));
})

module.exports = router;
var router = require('express').Router();

router.get("/favicon.ico", function(req, res){
	res.status(204);
});

module.exports = router;
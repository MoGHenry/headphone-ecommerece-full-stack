var express = require('express');
var router = express.Router();

/* GET product page. */
router.get('/', function(req, res, next) {
    res.json({message: "product route"});
});

module.exports = router;

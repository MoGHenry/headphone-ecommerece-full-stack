var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/', function(req, res, next) {
    res.json({message: "cart route"});
});

module.exports = router;

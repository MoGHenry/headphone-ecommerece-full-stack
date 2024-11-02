var express = require('express');
var router = express.Router();

/* GET wishlist page. */
router.get('/', function(req, res, next) {
    res.json({message: "wishlist route"});
});

module.exports = router;

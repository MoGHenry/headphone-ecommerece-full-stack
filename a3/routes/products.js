const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const Cart = require('../models/Cart');


/* GET product page. */
router.get('/', async function (req, res, next) {
 try {
     const products = await Product.find();
     res.json(products);
 } catch (e) {
     res.status(500).json({error: 'Failed to fetch products'})
 }
});

// GET product details by id
router.get('/:productID', async function (req, res, next) {
    try {
        const product_id = req.params.productID;
        const product = await Product.findOne({_id: product_id});
        if (!product){
            return res.status(404).json({error: "Product not found"});
        }

        res.json(product);
    }
    catch (e) {
        res.status(500).json({error: 'Failed to fetch product details', error_message: e});
    }
})

module.exports = router;

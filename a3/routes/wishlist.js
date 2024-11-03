const express = require('express');
const Wishlist = require("../models/wishlist");
const Product = require("../models/Products");
const Cart = require("../models/cart");
const router = express.Router();

/* GET wishlist page. */
router.get('/', async function(req, res, next) {
    try {
        const wishlistItems = await Wishlist.find().populate("productID", 'name price image');
        res.json({ wishlistItems });
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to retrieve Wishlist items', error_message: e.message });
    }
});

router.post('/add-to-wishlist', async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({error: "Invalid productID"});
        }

        const product = await Product.findOne({_id: productID});
        if(!product) {
            return res.status(400).json({error: "Product not found"});
        }

        let wishlistItem = await Wishlist.findOne({productID});
        if(wishlistItem) {
            return res.json({message: "Product already in Wishlist", cartItem: wishlistItem});
        }
        else {
            const newCartItem = new Wishlist({
                productID: productID
            })
            await newCartItem.save();
            return res.json({message: "Product added to Wishlist", newCartItem});
        }
    }
    catch (e) {
        res.status(500).json({error: "Failed to add product to Wishlist", error_message: e.message})
    }
})

router.delete('/remove-from-wishlist', async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({error: "Invalid productID"});
        }

        const wishlistItem = await Wishlist.findOneAndDelete({productID});
        if(!wishlistItem) {
            return res.status(400).json({error: "Product not found in Wishlist"});
        }
        return res.json({message: "Product removed from Wishlist", wishlistItem});
    }
    catch (e) {
        res.status(500).json({error: "Failed to remove product from Wishlist", error_message: e.message})
    }
})

router.post('/move-to-cart', async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({error: "Invalid productID"});
        }

        const wishlistItem = await Wishlist.findOneAndDelete({productID});
        if(!wishlistItem) {
            return res.status(400).json({error: "Product not found in Wishlist"});
        }

        const newCartItem = new Cart({
            productID: productID,
            quantity: 1
        })
        await newCartItem.save();
        return res.json({message: "Product moved to Cart", newCartItem});
    }
    catch (e) {
        res.status(500).json({error: "Failed to move product to Cart", error_message: e.message})
    }
})

module.exports = router;

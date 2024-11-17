const express = require('express');
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const router = express.Router();

/* GET cart page. */
router.get('/', async function(req, res, next) {
    try {
        const cartItems = await Cart.find().populate("productID", 'name price image');
        res.json({ cartItems });
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to retrieve cart items', error_message: e.message });
    }
});


router.post('/add-to-cart', async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        if (!productID || !quantity || quantity<1) {
            return res.status(400).json({error: "Invalid productID or quantity"});
        }

        const product = await Product.findOne({_id: productID});
        if(!product) {
            return res.status(400).json({error: "Product not found"});
        }

        let cartItem = await Cart.findOne({productID});
        if(cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.json({message: "Product quantity updated in Cart", cartItem});
        }
        else {
            const newCartItem = new Cart({
                productID: productID,
                quantity: quantity
            })
            await newCartItem.save();
            return res.json({message: "Product added to Cart", newCartItem});
        }
    }
    catch (e) {
        res.status(500).json({error: "Failed to add product to Cart", error_message: e.message})
    }
})

router.delete('/remove-from-cart', async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({error: "Invalid productID"});
        }

        const cartItem = await Cart.findOneAndDelete({productID});
        if(cartItem) {
            return res.json({message: "Product removed from Cart", cartItem});
        }
        else {
            return res.status(404).json({error: "Product not found in Cart"});
        }
    }
    catch (e) {
        res.status(500).json({error: "Failed to remove product from Cart", error_message: e.message})
    }
})

router.put('/update-cart-quantity', async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        if (!productID || !quantity || quantity<1) {
            return res.status(400).json({error: "Invalid productID or quantity"});
        }
        const cartItem = await Cart.findOne({productID});
        if(cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            return res.json({message: "Product quantity updated in Cart", cartItem});
        }
        else {
            return res.status(404).json({error: "Product not found in Cart"});
        }
    }
    catch (e) {
        res.status(500).json({error: "Failed to update product quantity in Cart", error_message: e.message})
    }
})

router.post('/move-to-wishlist', async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({error: "Invalid productID"});
        }

        const product = await Product.findOne({_id: productID});
        if(!product) {
            return res.status(400).json({error: "Product not found"});
        }

        const cartItem = await Cart.findOneAndDelete({productID});
        if(cartItem) {
            const wishlistItem = new Wishlist({
                productID: productID,
                quantity: cartItem.quantity
            })
            await wishlistItem.save();
            return res.json({message: "Product moved to Wishlist", wishlistItem});
        }
        else {
            return res.status(404).json({error: "Product not found in Cart"});
        }
    }
    catch (e) {
        res.status(500).json({error: "Failed to move product to Wishlist", error_message: e.message})
    }
})

module.exports = router;

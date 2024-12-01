const express = require('express');
const jwt = require('jsonwebtoken');
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const router = express.Router();
const authenticateUser = require('../utils/authMiddleware');
require('dotenv').config();


/* GET wishlist page for the current user */
router.get('/', authenticateUser, async function (req, res, next) {
    try {
        const wishlistItems = await Wishlist.find({ userID: req.userID }).populate("productID", 'name price image');
        res.json({ wishlistItems });
    } catch (e) {
        res.status(500).json({ error: 'Failed to retrieve Wishlist items', error_message: e.message });
    }
});

router.post('/add-to-wishlist', authenticateUser, async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({ error: "Invalid productID" });
        }

        const product = await Product.findOne({ _id: productID });
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        let wishlistItem = await Wishlist.findOne({ productID, userID: req.userID });
        if (wishlistItem) {
            return res.json({ message: "Product already in Wishlist", wishlistItem });
        } else {
            const newWishlistItem = new Wishlist({
                productID: productID,
                userID: req.userID
            });
            await newWishlistItem.save();
            return res.json({ message: "Product added to Wishlist", newWishlistItem });
        }
    } catch (e) {
        res.status(500).json({ error: "Failed to add product to Wishlist", error_message: e.message });
    }
});

router.delete('/remove-from-wishlist', authenticateUser, async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({ error: "Invalid productID" });
        }

        const wishlistItem = await Wishlist.findOneAndDelete({ productID, userID: req.userID });
        if (!wishlistItem) {
            return res.status(400).json({ error: "Product not found in Wishlist" });
        }
        return res.json({ message: "Product removed from Wishlist", wishlistItem });
    } catch (e) {
        res.status(500).json({ error: "Failed to remove product from Wishlist", error_message: e.message });
    }
});

router.post('/move-to-cart', authenticateUser, async (req, res) => {
    try {
        const { productID } = req.body;
        if (!productID) {
            return res.status(400).json({ error: "Invalid productID" });
        }

        const wishlistItem = await Wishlist.findOneAndDelete({ productID, userID: req.userID });
        if (!wishlistItem) {
            return res.status(400).json({ error: "Product not found in Wishlist" });
        }

        let cartItem = await Cart.findOne({ productID, userID: req.userID });
        if (cartItem) {
            cartItem.quantity += wishlistItem.quantity || 1;
            await cartItem.save();
        } else {
            const newCartItem = new Cart({
                productID: productID,
                quantity: wishlistItem.quantity || 1,
                userID: req.userID
            });
            await newCartItem.save();
        }
        return res.json({ message: "Product moved to Cart", cartItem });
    } catch (e) {
        res.status(500).json({ error: "Failed to move product to Cart", error_message: e.message });
    }
});

module.exports = router;

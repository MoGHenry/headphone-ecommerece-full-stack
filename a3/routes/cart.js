const express = require('express');
const Product = require("../models/Products");
const Cart = require("../models/cart");
const router = express.Router();

/* GET cart page. */
router.get('/', async function(req, res, next) {
    try {
        const cartItems = await Cart.find();

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No items in the cart' });
        }

        // Populate product details manually since productID is not an ObjectId
        const populatedCartItems = await Promise.all(cartItems.map(async item => {
            const product = await Product.findOne({ productID: item.productID });
            if (product) {
                return {
                    productID: product.productID,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: item.quantity
                };
            } else {
                return null;
            }
        }));

        // Filter out any null results if a product is not found
        const validCartItems = populatedCartItems.filter(item => item !== null);

        res.json(validCartItems);
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

        const product = await Product.findOne({productID: productID});
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

module.exports = router;

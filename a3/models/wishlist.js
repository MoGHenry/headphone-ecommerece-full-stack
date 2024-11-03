const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productID: {
        type: Number,
        ref: "Product",
        required: true
    }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);

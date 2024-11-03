const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productID: {
        type: Number,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});


module.exports = mongoose.model("Cart", cartSchema);

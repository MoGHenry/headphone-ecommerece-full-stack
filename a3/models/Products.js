const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true,
        unique: true
    },
    name: String,
    description: String,
    price: Number,
    image: String
})

module.exports = mongoose.model("Product", productSchema)

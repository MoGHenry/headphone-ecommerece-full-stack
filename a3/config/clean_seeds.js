require('dotenv').config();
const mongoose = require('mongoose')
const mongoURI = `mongodb://mongodb:27017/test`;
const Product = require('../models/Products');

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        return Product.deleteMany({});
    })
    .then(() => {
        console.log('All products deleted successfully');
        mongoose.connection.close(); // Close the connection after deletion
    })
    .catch(err => {
        console.error('Error during database operation:', err);
        mongoose.connection.close(); // Close the connection even if an error occurs
    });

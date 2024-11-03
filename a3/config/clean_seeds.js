const mongoose = require('mongoose');
const Product = require('../models/Products');

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://moghenry:Henryqiu998@a3.igdq5.mongodb.net/?retryWrites=true&w=majority&appName=a3'
)
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

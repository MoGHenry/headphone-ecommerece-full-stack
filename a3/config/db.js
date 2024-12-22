require('dotenv').config();
const mongoose = require('mongoose')
const mongoURI = `mongodb://mongodb:27017/test`;

mongoose.connect(mongoURI)
.then(
    () => console.log('Connected to DB')
)
.catch(
    error => console.log("Error connecting to MongoDB:\n", error)
)

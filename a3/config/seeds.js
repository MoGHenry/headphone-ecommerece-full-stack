const mongoose = require('mongoose')
const Product = require('../models/Products')

mongoose.connect(
    'mongodb+srv://moghenry:Henryqiu998@a3.igdq5.mongodb.net/?retryWrites=true&w=majority&appName=a3'
)
.then(
    () => console.log('Adding default product items')
)
.catch(
    err => console.log("Error connecting to MongoDB:\n", err)
)

const products = [
    {
        "name": "Mpow H19 IPO Active Noise Cancelling Headphones",
        "description": "Mpow H19 IPO Active Noise Cancelling Headphones, Bluetooth 5.0 Headphones with Deep Bass, Fast Charge, 35H Playtime, Lightweight Headset, CVC 8.0 Mic for Home Office, Online Study, Travel",
        "price": 50.99,
        "image": "https://www.xmpow.com/cdn/shop/products/1_a45a3e86-3968-46c1-bf07-aff1cb943fc7_720x.jpg?v=1661775821"
    },
    {
        "name": "Mpow H12 IPO Active Noise Cancelling Headphones",
        "description": "Mpow H12 IPO Active Noise Cancelling Headphones,Wireless Bluetooth Headset with Deep Bass, Noise Isolation Mic, CVC8.0, 40H, Type C, Foldable for Travel, Home Office, Online Class",
        "price": 52.99,
        "image": "https://www.xmpow.com/cdn/shop/products/MPBH427AB_720x.jpg?v=1629190678"
    },
    {
        "name": "MPOW Crescent Bluetooth Headset w/ CVC6.0 Noise Cancelling Mic--without Mpow Logo",
        "description": "Auricolare Bluetooth 4.1 con CVC 6.0 Microfono, CSR Chip e Catturare Voce Chiara, Cuffia Bluetooth Senza Fili Regolabile 180°",
        "price": 35.99,
        "image": "https://www.xmpow.com/cdn/shop/products/MPBH028AB1500x1500_720x.jpg?v=1645863439"
    },
    {
        "name": "Mpow HC6 Headset with Noise Reduction Microphone",
        "description": "Mpow HC6 USB Headset with Microphone, Comfort-fit Office Computer Headphone, On-ear 3.5mm Jack Call Center Headset for Cell Phone, 270 Degree Boom Mic, In-line Control with Mute for Skype, Webinar",
        "price": 28.99,
        "image": "https://www.xmpow.com/cdn/shop/products/BH328_720x.jpg?v=1615516963"
    },
    {
        "name": "Mpow Purpods Open Ear Headphones Sports Headphones, Clear Calls Noise Reduction",
        "description": "Mpow Purpods Open Ear Headphones Sports Headphones, Clear Calls Noise Reduction",
        "price": 32.99,
        "image": "https://www.xmpow.com/cdn/shop/files/61UlDhqj22L._AC_SL1500_720x.jpg?v=1689057609"
    }
]

Product.insertMany(products)
.then(
    () => {
        console.log("Product data seeded successful");
        mongoose.connection.close();
    }
)
.catch(
    error => {
        console.log("Product data seeded unsuccessful", error)
        mongoose.connection.close();
    }
)
import React from 'react'
import { useParams } from'react-router-dom'
import { useEffect, useState } from'react'
import './ProductDetails.css'
// import * as StorageUtils from './StorageUtils'

export default function ProductDetails() {
    const {product_id} = useParams();
    const [product, setProduct] = useState(null);

    // TODO add to cart and wishlist functionality
    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productID: product_id, quantity: 1 })
        };
        try {
            fetch("/api/cart/add-to-cart/", requestOptions)
                .then(response => response.json())
                .then(() => alert("Product added to cart successfully"))
                .catch(error => {
                    alert("Error adding product to cart");
                    console.log("Error adding product to cart:", error);
                });
        }
        catch (error) { console.log(error)}
    }
    const handleAddToWishlist = () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productID: product_id })
        }
        try {
            fetch("/api/wishlist/add-to-wishlist/", requestOptions)
                .then(response => response.json())
                .then(message => {
                    if (message.message === "Product already in Wishlist") {
                        alert("Product already exists in wishlist");
                    } else {
                        alert("Product added to wishlist successfully");
                    }
                })
                .catch(error => {
                    console.log("Error adding product to wishlist:", error);
                    alert("Error adding product to wishlist");
                });
        }
        catch (error) { console.log(error)}
    }

    useEffect(() => {
        // Fetch product data from the JSON file
        fetch("/api/products/"+product_id+"/")
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => {
                console.log("Error fetching product data:", error)
                alert("Error fetching product data");
            });
    }, [product_id]);
    if (!product) {
        return <div>Loading product details...</div>;
    }
    return (
        <div className="product-details">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className={"product-details-price"}>Price: ${product.price}</p>
            <div className={"description"}>
                Short description:
                <p>{product.description}</p>
            </div>
            <button className={"add-to-cart-button"}  onClick={handleAddToCart}>Add to cart</button>
            <button className={"add-to-wishlist-button"}  onClick={handleAddToWishlist}> Add to wishlist</button>
        </div>
    );
}


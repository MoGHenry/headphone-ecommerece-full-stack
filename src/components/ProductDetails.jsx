import React from 'react'
import { useParams } from'react-router-dom'
import { useEffect, useState } from'react'
import './ProductDetails.css'
import * as StorageUtils from './StorageUtils'

export default function ProductDetails() {
    const {product_id} = useParams();
    const [product, setProduct] = useState(null);
    // load cart and wishlist from local storage
    // const [cart, setCart] = useState(StorageUtils.getStorage('cart'));
    // const [wishlist, setWishlist] = useState(StorageUtils.getStorage('wishlist'));

    const handleAddToCart = () => {
        if(StorageUtils.addStorage('cart', product)){
            alert("Successfully added product to cart")
            console.log(StorageUtils.getStorage('cart'))
        }
        else{
            alert("Failed to add product to cart")
        }
    }
    const handleAddToWishlist = () => {
        if(StorageUtils.addStorage('wishlist', product)){
            alert("Successfully added product to wishlist")
            console.log(StorageUtils.getStorage('wishlist'))
        }
        else{
            alert("Failed to add product to wishlist")
        }
    }

    useEffect(() => {
        // Fetch product data from the JSON file
        fetch("/product_data.json")
            .then(response => response.json())
            .then(data => {
                // Find the product matching the product_id from URL params
                const foundProduct = data.find(p => p.id === Number(product_id));
                setProduct(foundProduct);
            })
            .catch(error => console.log("Error fetching product data:", error));
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


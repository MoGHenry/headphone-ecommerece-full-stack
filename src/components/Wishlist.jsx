// import * as React from 'react'
import React, {useState, useEffect} from 'react'
// import * as StorageUtils from './StorageUtils'
import {Link} from "react-router-dom";
import './Wishlist.css'


export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        fetch('/api/wishlist')
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                if (Array.isArray(data.wishlistItems)) {
                    setWishlist(data.wishlistItems);
                }
                else {
                    console.error("Unexpected response format:", data);
                    alert("Error fetching wishlist items");
                }
            })
            .catch(error => console.log("Error fetching wishlist items:", error));
    }, [shouldFetch]);

    const handleMoveToCart = (product_id, product) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productID: product_id
            })
        };

        // Make the fetch request directly inside this function
        fetch('/api/wishlist/move-to-cart', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Product moved to Cart") {
                    setShouldFetch(prev => !prev); // Toggle the state to trigger the fetch
                    alert("Product moved to Cart successfully");
                } else {
                    console.error("Unexpected response format:", data);
                    alert("Error moving product to Wishlist");
                }
            })
            .catch(error => {
                console.log("Error updating wishlist items:", error);
            });
    }

    const handleRemoveFromWishlist = (product_id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productID: product_id
            })
        };

        // Make the fetch request directly inside this function
        fetch('/api/wishlist/remove-from-wishlist', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Product removed from Wishlist") {
                    setShouldFetch(prev => !prev); // Toggle the state to trigger the fetch
                    alert("Product removed from Wishlist successfully");
                } else {
                    console.error("Unexpected response format:", data);
                    alert("Error removing product from Wishlist");
                }
            })
            .catch(error => {
                console.log("Error updating wishlist items:", error);
            });
    }
    return (
        <div className="wishlist">
            {wishlist && wishlist.length > 0? (
                wishlist.map(item => (
                <WishlistItem item={item.productID}
                              key={item.productID?._id}
                              handleMoveToCart={handleMoveToCart}
                              handleRemoveFromWishlist={handleRemoveFromWishlist}
                />
            ))) : (
            "Wishlist is empty"
            )}
        </div>
    );
}

function WishlistItem(props) {
    const product = props.item;
    const handleMoveToCart = props.handleMoveToCart;
    const handleRemoveFromWishlist = props.handleRemoveFromWishlist;

    return (
        <div key={product._id} className="wishlist-item">
            {/*image also hyperlink to product detail page*/}
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            {/*product name and hyperlink to product detail page*/}
            <Link to={`/product/${product._id}`}>
                <h3 className={"wishlist-name"}>{product.name}</h3>
            </Link>
            {/*product price*/}
            <p className={"wishlist-price"}>${product.price}</p>
            <button className={"move-to-cart-button"} onClick={() => handleMoveToCart(product._id, product)}>Move to Cart</button>
            <button className={"remove-from-wishlist-button"} onClick={() => handleRemoveFromWishlist(product._id)}>Remove from Wishlist</button>
        </div>
    )
}


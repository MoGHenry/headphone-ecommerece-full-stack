import * as React from 'react'
import { useState } from'react'
import * as StorageUtils from './StorageUtils'
import {Link} from "react-router-dom";
import './Wishlist.css'

export default function Wishlist() {
    const [wishlist, setWishlist] = useState(StorageUtils.getStorage('wishlist'));
    const handleMoveToCart = (product_id, product) => {
        StorageUtils.removeStorage('wishlist', product_id);
        StorageUtils.addStorage('cart', product)
        setWishlist(StorageUtils.getStorage('wishlist'));
        alert("Item moved to cart successfully");
        console.log(StorageUtils.getStorage('cart'));
        console.log(StorageUtils.getStorage('wishlist'));
    }

    const handleRemoveFromWishlist = (product_id) => {
        StorageUtils.removeStorage('wishlist', product_id);
        setWishlist(StorageUtils.getStorage('wishlist'));
        alert("Item removed from wishlist successfully");
        console.log(StorageUtils.getStorage('cart'));
        console.log(StorageUtils.getStorage('wishlist'));
    }
    return (
        <div className="wishlist">
            {wishlist.length === 0? "Your wishlist is empty" : wishlist.map(item => (
                <WishlistItem item={item}
                              key={item.id}
                              handleMoveToCart={handleMoveToCart}
                              handleRemoveFromWishlist={handleRemoveFromWishlist}
                />
            ))}
        </div>
    );
}

function WishlistItem(props) {
    const product = props.item;
    const handleMoveToCart = props.handleMoveToCart;
    const handleRemoveFromWishlist = props.handleRemoveFromWishlist;

    return (
        <div key={product.id} className="wishlist-item">
            {/*image also hyperlink to product detail page*/}
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            {/*product name and hyperlink to product detail page*/}
            <Link to={`/product/${product.id}`}>
                <h3 className={"wishlist-name"}>{product.name}</h3>
            </Link>
            {/*product price*/}
            <p className={"wishlist-price"}>${product.price}</p>
            <button className={"move-to-cart-button"} onClick={() => handleMoveToCart(product.id, product)}>Move to Cart</button>
            <button className={"remove-from-wishlist-button"} onClick={() => handleRemoveFromWishlist(product.id)}>Remove from Wishlist</button>
        </div>
    )
}


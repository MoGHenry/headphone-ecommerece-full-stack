import React, { useState, useEffect } from 'react';
import * as StorageUtils from './StorageUtils';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import { checkTokenExpiry } from "./authutils";

export default function Cart() {
    const [items, setItems] = useState([]);
    const [total_cost, setTotalCost] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(false);
    const navigate = useNavigate();

    // Check if the JWT is valid, otherwise redirect to login
    useEffect(() => {
        const token = localStorage.getItem('token');
        // const { valid, userID, email, name } = checkTokenExpiry(token);
        const { valid } = checkTokenExpiry(token);
        if (!valid) {
            alert('Access denied. Please log in first.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        fetch('/api/cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.cartItems)) {
                    setItems(data.cartItems);
                    const total = StorageUtils.getCartTotalCost(data);
                    setTotalCost(total);
                }
            })
            .catch(error => console.log('Error fetching cart items:', error));
    }, [navigate, shouldFetch]);

    const handelQuantityChange = (product_id, quantity) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productID: product_id,
                quantity: quantity
            })
        };

        fetch('/api/cart/update-cart-quantity', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Product quantity updated in Cart') {
                    setShouldFetch(prev => !prev);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => {
                console.log('Error updating cart items:', error);
            });
    };

    const handelMoveToWishlist = (product_id, product) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productID: product_id
            })
        };

        fetch('/api/cart/move-to-wishlist', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Product moved to Wishlist') {
                    setShouldFetch(prev => !prev);
                    alert('Product moved to Wishlist');
                } else {
                    console.error('Unexpected response format:', data);
                    alert('Error moving product to Wishlist');
                }
            })
            .catch(error => {
                console.log('Error updating cart items:', error);
            });
    };

    const handelRemoveFromCart = (product_id) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productID: product_id
            })
        };

        fetch('/api/cart/remove-from-cart', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Product removed from Cart') {
                    setShouldFetch(prev => !prev);
                    alert('Product removed from Cart');
                } else {
                    console.error('Unexpected response format:', data);
                    alert('Error removing product from Cart');
                }
            })
            .catch(error => {
                console.log('Error updating cart items:', error);
            });
    };

    return (
        <div className="cart-container">
            <p className="total-cost">Total: ${total_cost}</p>
            <div>
                <div className="cart">
                    {items && items.length > 0 ? (
                        items.map(item => (
                            <CartItem
                                item={item.productID}
                                quantity={item.quantity}
                                key={item.productID?._id}
                                handelQuantityChange={handelQuantityChange}
                                handelMoveToWishlist={handelMoveToWishlist}
                                handelRemoveFromCart={handelRemoveFromCart}
                            />
                        ))
                    ) : (
                        'Cart is empty'
                    )}
                </div>
            </div>
        </div>
    );
}

function CartItem(props) {
    const product = props.item;
    const quantity = props.quantity;
    const handelQuantityChange = props.handelQuantityChange;
    const handelMoveToWishlist = props.handelMoveToWishlist;
    const handelRemoveFromCart = props.handelRemoveFromCart;

    return (
        <div className="cart-item">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className="cart-item-details">
                <Link to={`/product/${product._id}`}>
                    <p>{product.name}</p>
                </Link>
                <div className="cart-item-quantity">
                    <p>Quantity:</p>
                    <select value={quantity} onChange={(e) => handelQuantityChange(product._id, e.target.value)}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={() => handelMoveToWishlist(product._id, product)}> Move to Wishlist </button>
                <button onClick={() => handelRemoveFromCart(product._id)}> Remove from Cart </button>
                <p className="cart-item-price">${product.price}</p>
            </div>
        </div>
    );
}

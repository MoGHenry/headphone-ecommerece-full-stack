import React, {useState} from 'react'
import * as StorageUtils from './StorageUtils'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart() {
    //get items from local storage and display them
    const [items, setItems] = useState(StorageUtils.getStorage('cart'))
    const [total_cost, setTotalCost] = useState(StorageUtils.getCartTotalCost())

    const handelQuantityChange = (product_id, quantity) => {
        StorageUtils.updateQuantity(product_id, quantity)
        setItems(StorageUtils.getStorage('cart'))
        setTotalCost(StorageUtils.getCartTotalCost())
        console.log(StorageUtils.getStorage('cart'))
    }

    const handelMoveToWishlist = (product_id, product) => {
        const item = items.find(item => item.id === product_id);
        if (item){
            StorageUtils.removeStorage('cart',product_id)
            StorageUtils.addStorage('wishlist', product)
            setItems(StorageUtils.getStorage('cart'))
            setTotalCost(StorageUtils.getCartTotalCost())
            console.log(StorageUtils.getStorage('cart'))
        }
        else{
            console.log("Product not found in cart")
        }
    }

    const handelRemoveFromCart = (product_id) => {
        StorageUtils.removeStorage('cart',product_id)
        setItems(StorageUtils.getStorage('cart'))
        setTotalCost(StorageUtils.getCartTotalCost())
        console.log(StorageUtils.getStorage('cart'))
    }

    return (
        <div className="cart-container">
            <p className="total-cost">Total: ${total_cost}</p>
            <div>
                <div className="cart">
                    {items.length === 0? "Cart is empty": items.map(item => (
                        <CartItem item={item}
                                  key={item.id}
                                  handelQuantityChange={handelQuantityChange}
                                  handelMoveToWishlist={handelMoveToWishlist}
                                  handelRemoveFromCart={handelRemoveFromCart}/>
                    ))
                    }
                </div>
            </div>

        </div>
    );
}


function CartItem(props) {
    const product = props.item
    const handelQuantityChange = props.handelQuantityChange
    const handelMoveToWishlist = props.handelMoveToWishlist
    const handelRemoveFromCart = props.handelRemoveFromCart
    return(
        <div className="cart-item">
            <Link to={`/product/${product.id}` }>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className="cart-item-details">
                <Link to={`/product/${product.id}` }>
                    <p>{product.name}</p>
                </Link>
                <div className={"cart-item-quantity"}>
                    <p>Quantity:</p>
                    <select value={product.quantity} onChange={(e) => handelQuantityChange(product.id, e.target.value)}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={()=>handelMoveToWishlist(product.id, product)}> Move to Wishlist </button>
                <button onClick={()=>handelRemoveFromCart(product.id)}> Remove from Cart </button>
                <p className="cart-item-price">${product.price}</p>
            </div>

        </div>
    )
}

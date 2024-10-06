import * as React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './Homepage'
import ProductList from './ProductList'
import Wishlist from './Wishlist'
import Cart from './Cart'
import './Navbar.css'
import ProductDetails from './ProductDetails'

export default function Navbar() {
    return (
        <div>
            <nav className={"navbar"}>
                <Link to="/" className="nav-item">Homepage</Link>
                <Link to="/product-list" className="nav-item">Product List</Link>
                {/*<Link to="/product-details" className="nav-item">Product Details</Link>*/}
                <Link to="/wishlist" className="nav-item">Wishlist</Link>
                <Link to="/cart" className="nav-item">Cart</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/product-list" element={<ProductList />}></Route>
                <Route path="/product-details" element={<ProductDetails />}></Route>
                <Route path="/wishlist" element={<Wishlist />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </div>
    );
}

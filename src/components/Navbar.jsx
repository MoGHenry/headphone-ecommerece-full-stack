import * as React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
// import Homepage from './Homepage'
import ProductList from './ProductList'
import Wishlist from './Wishlist'
import Cart from './Cart'
import './Navbar.css'
import ProductDetails from './ProductDetails'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import { checkTokenExpiry } from "./authutils";

export default function Navbar() {
    const navigate = useNavigate();
    const [isvalid, setIsvalid] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const {valid, userID, email} = checkTokenExpiry(token);
        setIsvalid(valid);
        console.log("navbar token", isvalid, valid);
    }, [navigate])

    return (
        <div>
            <nav className={"navbar"}>
                <Link to="/product-list" className="nav-item">Product List</Link>
                <Link to="/wishlist" className="nav-item">Wishlist</Link>
                <Link to="/cart" className="nav-item">Cart</Link>
                {isvalid ? (
                    <Link to="/profile" className="nav-item">Profile</Link> // Profile button for logged-in users
                ) : (
                    <>
                        <Link to="/login" className="nav-item">Login</Link>
                        <Link to="/register" className="nav-item">Register</Link>
                    </>
                )}
            </nav>
            <Routes>
                {/*<Route path="/" element={<Homepage />} />*/}
                <Route path="/" element={<ProductList />} />
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/product/:product_id" element={<ProductDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

import * as React from 'react'
import { useEffect, useState } from'react'
import './ProductList.css'

// This is a functional component that displays a list of available products.
// Implement 'useEffect' to fetch product data from a local JSON file '.product_data.json'
// use 'useState' to handle the addtion removal, and updating of items in the cart and wishlist

export default function ProductList() {
    // load the data from the local JSON file
    let [products, setProducts] = useState([])
    console.log("start fetching data")
    useEffect(() => {
        fetch('./product_data.json')
            .then(response => {
                 console.log("response received");
                 return response.json();
            })
            .then(data => {
                 console.log("data received");
                 setProducts(data);
            })
            .catch(error => console.log(error))
        }, [])
    console.log("data fetched")
    console.log(products)

    // display the list of products
    return (
        <div className="product-list">
            {products.length === 0 ? <p>No products available</p> : products.map((product, index) => (
                <div key={index} className="product-list-item">
                    {/*image also hyperlink to product detail page*/}
                    <a href={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name} />
                    </a>

                    {/*product name and hyperlink to product detail page*/}
                    <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
                    {/*product price*/}
                    <p className={"product-list-price"}>${product.price}</p>
                </div>
            ))}
        </div>
    );
}

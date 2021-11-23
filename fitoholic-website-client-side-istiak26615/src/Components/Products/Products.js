import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const[products, setProducts]=useState([])
    useEffect(()=>{
        fetch('https://stark-falls-07406.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data.splice(0, 6)))
    },[])
    return (
        <div className=" container">
                  
        <div className="row justify-content-center"> 
        <h3 style={{color:"white"}} className="m-2">Our Products</h3>      
            {
                products.map(product=><Product key={product.id} product={product}></Product>)
            }
        </div>
        
        </div>
    );
};

export default Products;
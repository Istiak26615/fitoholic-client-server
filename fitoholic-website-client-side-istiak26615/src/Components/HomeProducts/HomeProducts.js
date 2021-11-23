import React, { useEffect, useState } from 'react';
import HomeProduct from '../HomeProduct/HomeProduct';

const HomeProducts = () => {
    const[homeProducts, setHomeProducts]=useState([])
    useEffect(()=>{
        fetch('https://stark-falls-07406.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setHomeProducts(data))
    },[])
    return (
        <div>
            <div className=" container">
                  
                  <div className="row justify-content-center"> 
                  <h3 style={{color:'white'}}>Our Products</h3>      
                      {
                          homeProducts.map(homeProduct=><HomeProduct key={homeProduct.id} homeProduct={homeProduct}></HomeProduct>)
                      }
                  </div>
                  
                  </div>
        </div>
    );
};

export default HomeProducts;
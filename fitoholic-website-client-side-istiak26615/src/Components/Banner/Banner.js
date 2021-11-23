import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Banner = () => {
    return (
        <div className="banner-container">
            <div className="header-img">
            {/* <Link to="/allProducts" className="items">
            <button className="btn btn-primary explorebtn">Explore</button>
                  </Link> */}
                  <h2 className="items explorebtn">Make a strong "YOU"</h2>
                 
            </div>
            
        </div>
    );
};

export default Banner;
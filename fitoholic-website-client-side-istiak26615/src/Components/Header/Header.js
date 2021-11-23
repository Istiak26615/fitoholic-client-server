import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import './Header.css';

const Header = () => {
  const {user, logout}=useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`https://stark-falls-07406.herokuapp.com/checkAdmin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [user?.email]);
    return (
        <div className="MenuBar-container menubar mt-2  d-flex align-items-center">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
            
              <div className="logo-img">
              <Link to="/" className=" d-flex align-items-center items">
                
                <h3 className="logoname">Fitoholic</h3>
                </Link>
                
              </div>
              
            </div>
            
            
            
            <div className="col-md-8">
              <div className="menu-container">
                <ul className="d-flex align-items-center justify-content-end ">
                {/* {user.email?
                  <Link to="/allProducts" className="items">
                  <li>Explore</li></Link>:''}
                  {user.email? <Link to="/pay" className="items">
                  <li>Pay</li></Link>:""}
                  {user.email? <Link to="/review" className="items">
                  <li>Review</li></Link>:""}
                   */}
                   <Link to="/allProducts" className="items">
                  <li>Explore</li></Link>


{user.email && !isAdmin?<NavDropdown title="User DashBoard"  id="basic-nav-dropdown " className="items">

          <NavDropdown.Item><Link to="/myorder" className="items">
                  <li style={{color:"black"}}>My Orders</li>
                </Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/pay" className="items">
                  <li style={{color:"black"}}>Pay</li>
                </Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/review" className="items">
                  <li style={{color:"black"}}>Review</li>
                </Link></NavDropdown.Item>
        </NavDropdown>:""}

        {isAdmin && (<NavDropdown title="Admin DashBoard"  id="basic-nav-dropdown " className="items">

          <NavDropdown.Item><Link to="/makeAdmin" className="items">
                  <li style={{color:"black"}}>Make Admin</li>
                </Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/manageAllOrder" className="items">
                  <li style={{color:"black"}}>Manage All Order</li>
                </Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/addProduct" className="items">
                  <li style={{color:"black"}}>Add Product</li>
                </Link></NavDropdown.Item>
          <NavDropdown.Item><Link to="/manageProduct" className="items">
                  <li style={{color:"black"}}>Manage Product</li>
                </Link></NavDropdown.Item>
        </NavDropdown>)}

                  {!user.email?
                  <div className="col-md-4 d-flex align-items-center">
                    <Link to="/signin" className="items">
                  <li>Sign In</li></Link>
                  <Link to="/signup" className="items">
                  <li>Sign Up</li>
                </Link>
                  </div>:
                  <Link to="/" className="items d-flex align-items-center">
                  <li onClick={logout}>Sign Out</li></Link>}
                  {user.email?<small className="user-name">Signed in as {user.displayName}</small>:<p></p>}
                  
                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useFirebase from '../../Hooks/useFirebase';
import './Signup.css';

 
const Signup = (props) => {
    const{error,getName,getEmail,getPassword,userRegistration}=useAuth()
    return (
        <div>
            
            <div className="signup-bg">
           {error}
            {/* <img className="signup-logo" src={logo1} alt=""/><br/> */}
            <div>
            <input className="signup-input-design" onBlur={getName}  type="text " placeholder="Name"></input><br/>
            <input className="signup-input-design" onBlur={getEmail} type="email" placeholder="Email" required></input><br/>
            <input className="signup-input-design" onBlur={getPassword} type="password" placeholder="Password" required></input><br/>
            {/* <input className="signup-button"  type="submit" value="Submit"></input><br/> */}
            <button onClick={userRegistration} className="singup-button">Sign up</button><br/>
            
            </div>
            <Link to="/signin"  id="takeToLogin">
            <p>Already Have an account? Click Here to Login</p></Link>
        </div>
        </div>
    );
};

export default Signup;
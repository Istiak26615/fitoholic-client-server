import userEvent from '@testing-library/user-event';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useFirebase from '../../Hooks/useFirebase';
import './Signin.css'


const Signin = (props) => {
    const{user,loginWithGoogle,logout, userEmail, usersPassword,error, signInEithEmail}=useAuth();
    
    return (
        <div className="login-bg">
            {error}
           <div>
            <input className="login-input-design" onBlur={userEmail}  type="text" placeholder="Email"></input><br/>
            <input className="login-input-design" onBlur={usersPassword}  type="password" placeholder="Password"></input><br/>
            {!user.email?<button onClick={signInEithEmail} className="login-button">Login</button>:
            <button onClick={logout} className="login-button">Logout</button>}
            
            <br/><button onClick={loginWithGoogle} className="login-button">Login With Google</button>
            

            </div>

           <Link to="/signup"  id="takeToLogin">
            <p>No account? Create an account</p></Link>
        </div>
    );
};

export default Signin;
import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from "firebase/auth";
import firebaseIntializeApp from '../Firebase/Firebase.init';
import { Redirect, useHistory, useLocation } from 'react-router';

firebaseIntializeApp() 

const useFirebase = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [name, setName]=useState('')
    const[user,setUser] =useState({})
    const [error, setError] = useState("");
    const [useremail, setUserEmail]=useState('')
    const[userPassword, setUserPassword]=useState('')
    const[isLoading, setIsLoading]=useState(true)
   
    
    const getEmail=e=>{
        setEmail(e.target.value)
    }
    const getName=e=>{
        setName(e.target.value)
    }
    const getPassword=e=>{
        setPassword(e.target.value)
    }
    
    const userEmail=e=>{
        setUserEmail(e.target.value)
    }
    const usersPassword=e=>{
        setUserPassword(e.target.value)
    }

    // user reg using email pass
    const userRegistration=e=>{
        e.preventDefault();
        if(email.length===0){
            setError("please enter your email")
            return;
        }
        if(password.length===0){
            setError("please enter your password")
            return;
        }
        if(password.length<6){
            setError("Password should be at least 6 character")
            return;
        }

        const setUserInfo=()=>{
            updateProfile(auth.currentUser,{
                displayName:name
            }).then(()=>{})
            .catch(()=>{
                setError(error.message)
            })
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            setUserInfo();
            const user=result.user;
            handleUserInfoRedister(result.user.email)
            setError("")
        })
        .catch(error=>{setError(error.message)})
       
    }

    // signin using email and pass 

    const signInEithEmail=e=>{
        e.preventDefault();
        if(useremail.length===0){
            setError('please give your email')
        }
        if(userPassword.length===0){
            setError('please give your password')
        }
        signInWithEmailAndPassword(auth, useremail,userPassword)
        .then(result=>{
            const user=result.user;
            setUser(result.user)
            alert("Logged In Successfully")
            setError("");
        })
        .catch(error=>{
            setError("Login Failed! Try Again")
        })
    }

    // email post in db
    const handleUserInfoRedister=(email)=>{
        fetch(`https://stark-falls-07406.herokuapp.com/addUserInfo`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email})
        })
        .then((res)=>res.json())
        .then(result=>{console.log(result);
            if(result.insertedId){
                alert('Registered Successfully')
            }
            
        })
    }
   
//  login with google 

    const loginWithGoogle=()=>{
        setIsLoading(true);
        signInWithPopup(auth, provider)
        .then(result=>{setUser(result.user)
            })
        .finally(()=>setIsLoading(false));
        
    }
    let logout=()=>{
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser('')
          }).finally(()=>setIsLoading(false));
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              setUser(user)
              
            } else {
              setUser("")
            } setIsLoading(false);
          });
    },[])
    return {user, loginWithGoogle,logout,error, 
    isLoading,name,getName,signInEithEmail,getEmail,userRegistration, getPassword,userEmail,usersPassword}
};

export default useFirebase;
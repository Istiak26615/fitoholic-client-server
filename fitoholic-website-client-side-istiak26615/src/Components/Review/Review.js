import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Review = () => {
    const {user }=useAuth();
    const[myReview, setMyReview]=useState([])
    
    useEffect(()=>{
        fetch(`https://stark-falls-07406.herokuapp.com/review`)
        .then(res=>res.json())
        .then(data=>setMyReview(data))
    },[]);
    return (
        <div>
            <h1 style={{color:"white"}}>Reviews</h1>
            <div className="all-purchase">
                <div className="row container text-center justify-content-center">
                     {myReview.map((myReview, index)=>(
                         <div className="col-md-3 service justify-content-center">
                         <Card style={{ width: '18rem'}} className="fullcard" >
                           <Card.Body className="bg-light text-black rounded-bottom text-start cardbody">
                               <Card.Text>
                               <div>
                               {/* <span id="description">
                               </span><br/> */}
                               <p>"{myReview?.review}"</p>
                                <small>{myReview?.email}</small><br/>
                               </div>
                               
                                                             
                               </Card.Text>  
                           </Card.Body>
                           
                           </Card>
                           
                       </div>
                     ))}
                </div>
            </div>
        </div>
    );
};

export default Review;
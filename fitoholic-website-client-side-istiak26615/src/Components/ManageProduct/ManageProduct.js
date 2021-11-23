import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth';

const ManageProduct = () => {
    const {user }=useAuth();
  const[manageProduct, setManageProduct]=useState([])
    const [isDelete, setIsDelete] = useState(null);
    useEffect(()=>{
        fetch('https://stark-falls-07406.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setManageProduct(data))
    },[isDelete]);

    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://stark-falls-07406.herokuapp.com/deleteProduct/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        if (result.deletedCount) {
            setIsDelete(true);
          } else {
            setIsDelete(false);
          }
      });
      };
    return (
        <div>
      <div>
            <h1 style={{color:"white"}}>Manage All Products</h1>
            <div className="all-bookings justify-content-center">
                <div className="row container text-center justify-content-center">
                     {manageProduct.map((manageProduct, index)=>(
                         <div className="col-md-3 service justify-content-center">
             
                         <Card style={{ width: '18rem'}} className="fullcard" >
                           <Card.Img className="card-img" variant="top" src={manageProduct?.image} />
                           <Card.Body className="bg-light text-black rounded-bottom text-start cardbody">
                               <Card.Title>{manageProduct?.name}</Card.Title>
                               <Card.Text>
                                   <span id="description">
                               <small>{manageProduct?.description}</small></span><br/>
                               <p><b>${manageProduct?.price}</b></p><br/>
                              
                               
                               
                                
                               {/* <button className="btn btn-danger m-2">Delete</button> */}
                               <button onClick={()=>handleDelete(manageProduct._id)} className="btn btn-danger m-2">Delete</button>
                               
                               
                               </Card.Text>  
                           </Card.Body>
                           
                           </Card>
                           
                       </div>
                     ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default ManageProduct;
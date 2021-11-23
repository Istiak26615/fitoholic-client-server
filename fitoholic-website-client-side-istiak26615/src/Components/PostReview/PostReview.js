import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PostReview = () => {
    const {user }=useAuth();
    const {id}=useParams()
    const [postReview,setPostReview]=useState({})
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        fetch(`https://stark-falls-07406.herokuapp.com/review/${id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((result)=>
        {console.log(result);
            if(result.insertedId){
                alert('review submitted')
            }
            
        })
      };
    return (
        <div>
            <h1 style={{color:"white"}}> Review: {postReview.name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
      
      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" defaultValue={user.displayName} {...register("userName", { required: true })} required placeholder="User Name" /><br/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2"  defaultValue={user.email} {...register("email", { required: true })} required placeholder="User Email" /><br/>
      
      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2"   {...register("review", { required: true })} required placeholder="Write Review"/><br/>

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input className="m-2 p-2 btn btn-primary"  type="submit" />
    </form>
        </div>
    );
};

export default PostReview;
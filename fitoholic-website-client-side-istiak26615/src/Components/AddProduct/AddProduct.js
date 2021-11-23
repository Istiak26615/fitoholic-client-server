import React from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
      
      fetch(`https://stark-falls-07406.herokuapp.com/products`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(data)
      })
      .then((res)=>res.json())
      .then((result)=>{console.log(result);
        if(result.insertedId){
            alert('Product Added Successfully')
        }
        
    });
      console.log(data);
      
    };
    return (
        <div>
            <h1 style={{color:"white"}}>Add a new product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" {...register("id", { required: true })} required placeholder="ID" /><br/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" {...register("name", { required: true })} required placeholder="Name" /><br/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" {...register("description", { required: true })} required placeholder="Description" /><br/>

      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" {...register( "image",{ required: true })} required placeholder="Image" /><br/>
      
      {/* include validation with required or other standard HTML validation rules */}
      <input className="m-2 p-2" type="number" {...register("price",  { required: true })} required placeholder="Price" /><br/>
      
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input className="m-2 p-2 btn btn-primary" type="submit" />
    </form>
        </div>
    );
};

export default AddProduct;
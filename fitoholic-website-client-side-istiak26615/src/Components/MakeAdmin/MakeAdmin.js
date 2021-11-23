import React from 'react';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        fetch("https://stark-falls-07406.herokuapp.com/makeAdmin", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {console.log(result);
        if(result){
            alert('made admin successfully')
        }
        
    });
        console.log(data);
      };
    return (
        <div style={{margin:"100px"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-field"
          name="email"
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <br />

        <input
          className="submit-btn btn btn-primary mt-3"
          type="submit"
          value="Make Admin"
          
        />
      </form>
    </div>
    );
};

export default MakeAdmin;
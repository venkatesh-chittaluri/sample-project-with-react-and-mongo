import { ErrorResponse } from "@remix-run/router";
import React from "react";
import {useForm} from "react-hook-form";
import {MdLogin} from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom"
function SignUp(){
    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();
    const navigate=useNavigate()
    const onFormSubmit=(userObj)=>{
        //console.log(userObj)
        //http post requests
        axios.post('http://localhost:4000/user-api/create-user',userObj)
        .then(response=>{
          console.log(response);
          alert(response.data.message);
          //if user created successfully
          if(response.data.message=='new user created'){

          
          //navigate to login
          navigate('/Login')
          }
        })
        .catch(error=>{
          console.log(error)
          alert("something went wrong")
        })
    }
    return(
    <form className="" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-3 w-25">
    <label for="username" className="form-label">username</label>
    <input type="username" className="form-control" id="username" placeholder="enter username" {...register("username",{required:true})}></input>
    {/**validation error message for password */}
    {errors.username&&<p className="text-danger">username is required</p>}
  </div>
  <div className="mb-3 w-25">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" placeholder="enter password" {...register("password",{required:true})}></input>
    {/**validation error message for password */}
    {errors.password&&<p className="text-danger">password is required</p>}
  </div>     
  <div className="mb-3 w-25">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="enter email" {...register("email",{required:true})}></input>
    {/* validation error message for username */}
    {errors.email&&<p className="text-danger">*mail is requires</p>}
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 w-25">
    <label for="city" className="form-label">city</label>
    <input type="city" className="form-control" id="city" aria-describedby="" placeholder="enter city" {...register("city",{required:true})}></input>
    {/* validation error message for username */}
    {errors.city&&<p className="text-danger">*address requires</p>}
    <div id="" className="form-text">your current city</div>
  </div>
 
  
  <button type="submit" className="btn btn-primary">SignUp<MdLogin /></button>
</form>
    )

}
export default SignUp;
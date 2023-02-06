import React from "react";
import { useForm } from 'react-hook-form'
import Home from "./Home";
import logimg from "../images/house.svg"
import {useSelector,useDispatch} from 'react-redux'
import {userLogin} from '../slices/userSlice'
import 'bootstrap/dist/css/bootstrap.css'
function Login(){
    const {register,handleSubmit,formState:{errors}}=useForm();

    let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
    let dispatch=useDispatch();
    const onFormSubmit=(userCredentialsObject)=>{
      console.log(userCredentialsObject)
        let result = dispatch(userLogin(userCredentialsObject))
        console.log(result)
    }

    return(
      <div className="container">
        
        <p className="display-2 text-center text-primary">Login</p>
        <img
        src={logimg}
        width="300px"
        className="d-sm-block d-none mx-auto"
        />
       
   
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
    <i className="bi bi-eye-slash"id="togglePassword"></i>
  
    {/**validation error message for password */}
    
   
    {errors.password&&<p className="text-danger">password is required</p>}
  </div>     
  <button type="submit" className="btn btn-primary">Login</button>
  </form>
  
  </div>
 
  
    )

}
export default Login;
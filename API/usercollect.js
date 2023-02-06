//create router to handle user api requests
const exp=require('express');

const userApp=exp.Router();
const expressAsyncHandler=require("express-async-handler");
//import bcrypt for password hashing
const bcryptjs=require("bcryptjs");
const { request } = require('express');
//import jsonwebtoken to create token
const jwt=require("jsonwebtoken")

require('dotenv').config()

//to extract body of request object
userApp.use(exp.json());





//user api routes


//create route to handle
userApp.get('/getusers',expressAsyncHandler(async(request,response)=>{
  //get usercollectobject
  let uCO=request.app.get("uCO");
  //get all users
  let users=await uCO.find().toArray()
  //send rep
  response.send({message:"users list",payload:users})

   
}));

//create route to handle '/getusers/id'
 userApp.get('/getuser/:id',expressAsyncHandler(async(request,response)=>{
  let uCO=request.app.get("uCO");
  //get all users
  let users=await uCO.find().toArray()
  //send rep
  let userid=(request.params.id);
  let userObj=users.find(userObj=>userObj.id==userid)
  if(userObj==undefined){
    response.send({message:"users undefined"})
  }
  else{
    response.send({message:"user found",payload:userObj})
  }
     
 }))
 //create a route to user login
 userApp.post("/login",expressAsyncHandler(async(request,response)=>{
  //get user collection object
  let uCO=response.app.get("uCO");
  //get user credentials obj from client
  let userCredobj=request.body
  //search for user by username
  let userOfDB=await uCO.findOne({username:userCredobj.username}) 
  //if username not existed
  if(userOfDB==null){
    response.send({message:"invalid user"})
  }
  //if username existed main process
  else{
      //compare passwords
     let status=await bcryptjs.compare(userCredobj.password,userOfDB.password)
      //if password not matched
      if(status==false){
        response.send({message:"invalid password"})
      }
      //if password matched
      else{
        //create token
        let token=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
         
         //send token
         response.send({message:"success",payload:token,userObj:userOfDB})

      }
  }
 }))   

//create a route to 'create-user'
 userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    //get usercollectionObject
    let uCO=request.app.get("uCO");
    //get userObj from client
    let newUserObj=request.body;
    //set for user by username
    let userOfDB=await uCO.findOne({username:newUserObj.username})
    //if user existed
    if(userOfDB!==null){
       response.send({message:"Username has already taken..plz choose another"}) 
    }
    //if user is not existed
    if(userOfDB!==null){
      response.send({message:"user already there"})
    }
    //if user not existed
    else{
      //hash password
      let hashedPassword=await bcryptjs.hash(newUserObj.password,6)
      //replace plain password with hashed password in newuser
      newUserObj.password=hashedPassword;
      //insert user
      await uCO.insertOne(newUserObj)
      //send response
      response.send({message:"new user created"})
    }


 }))


 //create a route to modify user data
//update product
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
  //get userCollectionObject
  let uCO=request.app.get("uCO");
  //let userid=(+request.params.id)
  //let uid=(+request.params.id);
  //let userid=await uCO.findOne({id:modifiedUser.id})
  //console.log(userid)
  //get modified user obj
  let modifiedUser=request.body;
  
  console.log(modifiedUser)
  //update
 // if(userid==null){
   // response.send("no user")
  
 // else{
  let upd=await uCO.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
  response.send(upd)
  console.log(upd)
  //send response
  //response.send({message:"user modified"})
  
  //}

}))



 //create a route to delete user by name
 userApp.delete('/remove-user/:username',expressAsyncHandler(async(request,response)=>{
  let uCO=request.app.get("uCO");
  
    let userid=request.params.username;
    console.log(userid)

    await uCO.deleteOne({username:userid})
    response.send({message:"user deleted"})

 }));
 //export userApp
 module.exports=userApp;

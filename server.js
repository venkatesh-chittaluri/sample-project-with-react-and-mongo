const { request, response } = require('express');
const exp=require('express')
const app=exp()
const mclient=require('mongodb').MongoClient;

require('dotenv').config()

//import path module
const path=require('path');

//connect build of react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))
 //import userapp
 const userApp=require('./API/usercollect');
 const productApp=require('./API/productcollect');
 //data base connection url
 const DBurl=process.env.DATABASE_CONNECTION_URL;
 //connect with mdb server
 mclient.connect(DBurl)
 .then((client)=>{
    //get db object
    let dbObj=client.db("venkynew");
    //create collection objects
    let uCO=dbObj.collection("usernewcollect");
    let productcollection=dbObj.collection("productcollection");
    //sharing collection objects to apis
    app.set("uCO",uCO);
    app.set("productcollection",productcollection)
    console.log("db connection success") 
 })
 .catch(err=>console.log('error in db connection',err))
 //execute specific middleware based on path
 app.use('/user-api',userApp);
 app.use('/product-api',productApp)
  
 //dealing with page refresh
 app.use('*',(request,response)=>{
   response.sendFile(path.join(__dirname,'./build/index.html'))
 })
 //handling invalid paths
 app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
 })
 //error handling middleware
 app.use((error,request,response,next)=>{
   response.send({message:"error occured",reason:`${error.message}`})
 })


 const port=process.env.PORT;
app.listen(port,()=>console.log(`web server listening ${port}`))
//create a special route to handle product requests
const { request, response } = require('express');
const exp=require('express');
const productApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');
//to extract body of request object
productApp.use(exp.json());

//product api routes or get all products ##actual route
productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
    //get productcollection
    let productcollection=request.app.get("productcollection")
    //read all products
    let product=await productcollection.find().toArray()
    //send response
    response.send({message:"all products",payload:product})

}));


//get product by id
productApp.get('/getproduct/:id',expressAsyncHandler(async(request,response)=>{
    //get productcollection
    let productcollection=request.app.get("productcollection");
    //get productId from url param
    let pid=(+request.params.id);
    //get product by id
    let product=await productcollection.findOne({productID:pid})
    //if product not existed with given id
    if(product==null){
        response.send({message:'product not there'})

    }
    //if product existed
    else{
        response.send({message:'product existed ',payload:product})
    }   
}))


//to create product
productApp.post('/create-product',expressAsyncHandler(async(request,response)=>{
    //get productcollection
    let productcollection=request.app.get("productcollection")
    // response.send({message:"product is created"})
    //console.log(request.body)

    //get product obj from request
     let productObj=request.body;
    // productcollection.insertOne(productObj,(err,result)=>{
    //     if(err){console.log(" err is creating product ",err)}
    //     else{
    //         response.send({message:'product created successfully'})
    //     }
    // })
    //productcollection.insertne(productObj)
    //.then(result=>response.send({message:'product created successfully'}))
    //.catch(err=>console.log("error in creating product ",err))
    //insert productObj
   // console.log(productObj)
 // let result=await productcollection.insertOne(productObj);
  //response.send({message:"product inserted"});
  
  //fresh
  let result=await productcollection.insertOne(productObj);
  response.send({message:"product created successfully"});

   
       
    }));
    //update product
    productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
        //get productcollection
        let productcollection=request.app.get("productcollection");
        //get modified product obj
        let modifiedProduct=request.body;
        console.log(modifiedProduct)
        //update
        await productcollection.updateOne({productID:modifiedProduct.productID},{$set:{...modifiedProduct}})
        //send response
        response.send({message:"product modified"})
    }))
    //delete product by id
    productApp.delete("/remove-product/:id",expressAsyncHandler(async(request,response)=>{
       //get productcollection
       let productcollection=request.app.get("productcollection");
       //get productId from url param
         let pid=(+request.params.id);
         //get product by id
    let product=await productcollection.deleteOne({productID:pid})
     //send response
     response.send({message:"product deleted"})
      

    }))



//export productApp
module.exports=productApp;
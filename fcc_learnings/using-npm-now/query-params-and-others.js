const express = require('express')
const app = express()
const {products} = require('./data')

app.get('/',(req,res)=>{
    // 1 using basic textual value
    // res.json([{name:'Pranav'},{name:'Stewie'}])
    
    // 2 using products json imported from another file
    // res.json(products)

    // 3 using the products api
    res.send("<h1>Home Page<h1><a href='/api/products'>Products</a>")
})


app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
})

// basic numeric value
// app.get('/api/products/1',(req,res)=>{

// better way, route paramter
app.get('/api/products/:productID',(req,res)=>{
    
    console.log(req.params);

    const productID = Number(req.params.productID)
    const singleProduct = products.find((product)=>product.id==productID)

    if(!singleProduct){
        return res.status(404).send("Product not found")
    }

    res.json(singleProduct)
})


app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params)

    res.json(`Review number ${req.params.reviewID} of product number ${req.params.productID} is to be sent here.`)
})

//****SEARCH*** */
app.get('/api/v1/query',(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    
    const{search,limit} =req.query

    let sortedProducts = [...products]

    //****USING RETURN WITH THE IF CONDITIONS CAUSE WE CAN ONLY SEND ONE RESPONSE PER REQUEST */

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }

    if(sortedProducts.length<1){
        return res.status(200).json({success:true,data:[]})
    }

    res.status(200).json(sortedProducts)

})

app.all("*",(req,res)=>{
    console.log(req)
    res.status(404).send(`<h1>Error 404! Not found anything here.</h1>Can not find ${req}`)
})


app.listen(3000,()=>{
    console.log("Server up on port 3000");
})

const http = require("http");
const { getAllProducts,getproductById,addNewProduct,editProduct,delProduct } =require('./productController') 
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const server = http.createServer((req,res)=>{
  if(req.url==='/'){
     res.writeHead(200,{"Content-Type":"text/html"})
     res.end("<h2>This is RESTFUL API IN NODE JS <br> useful link api/products</h2>");
  }else if(req.url==="/api/products" && req.method==='GET' ){

    getAllProducts(req,res)

  }else if(req.url.match(/\/api\/products\/([0-9a-z]+)/) && req.method==='GET'){
     const proid = req.url.split("/")[3]
    getproductById(req,res,proid)
    
  }else if(req.url==='/api/products' && req.method==='POST'){
    addNewProduct(req,res)

  }else if(req.url.match(/\/api\/products\/([0-9a-z]+)/) && req.method==='PUT'){
    const proid = req.url.split("/")[3]
    editProduct(req,res,proid)
  }else if(req.url.match(/\/api\/products\/([0-9a-z]+)/) && req.method==='DELETE'){
    const proid = req.url.split("/")[3]
    delProduct(req,res,proid)
  }
  else{
    res.statusCode = 404;
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({message:"The page is not found"}));
  }
})

server.listen(PORT,()=>{
    console.log(`server is running at http://${HOSTNAME}:${PORT}`)
})
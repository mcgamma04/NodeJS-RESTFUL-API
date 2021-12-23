const products = require('./productmodel')
const { getBodyPost } =  require('./filemanagement')

async function getAllProducts(req,res){
  try {
     const prods  = await products.displayAll();
     res.writeHead(200,{'Content-Type':"application/json"})
res.end(JSON.stringify(prods))
  } catch (error) {
      console.log(error)
  }
}

async function getproductById(req,res,id){
    
    try {
        const prods = await products.displayProductById(id);
        if(prods){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(prods));
        }else{
            res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:`Product with this ${id} id is not found in the database`}));
        }

    } catch (error) {
        console.log(error)
        
    }
}

async function addNewProduct(req,res){
  try {
      const body = await getBodyPost(req);
      const { productName,productDescription,size,color,quantity,images,price,dateUploaded,dateEdited }= JSON.parse(body);
      const npro ={
        productName,
        productDescription,
        size,
        color,
        quantity,
        images,
        price,
        dateUploaded,
        dateEdited
      }

  const newProductq = await products.addProduct(npro);
   res.writeHead(201,{'Content-Type':'application/json'});
   res.end(JSON.stringify(newProductq))
  } catch (error) {
      console.log(error);
  }
}

async function editProduct(req,res,id){
try {
    const product = await products.displayProductById(id);

    if(!product){
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'Product not found'}));
        }else{
            const body = await getBodyPost(req);
            
            const { productName,productDescription,size,color,quantity,images,price,dateUploaded,dateEdited }= JSON.parse(body);
      const npro ={
        productName:productName || product.productName,
        productDescription:productDescription || product.productDescription,
        size:size  || product.size ,
        color:color || product.color,
        quantity:quantity || product.quantity,
        images:images || product.images,
        price:price || product.price,
        dateUploaded:dateUploaded || product.dateUploaded,
        dateEdited:dateEdited || product.dateEdited
      }
      const editedProducted = await products.edit(productId,npro);
      res.writeHead(200,{'Content-Type':'application/json'})
      res.end(JSON.stringify(editedProducted));


        }

} catch (error) {
    console.log(error);
}
}

async function delProduct(req, res, id) {
    try {
        const product = await products.displayProductById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await products.removeProduct(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product with ${id} has been deleted` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProducts,
    getproductById,
    addNewProduct,
    editProduct,
    delProduct
}
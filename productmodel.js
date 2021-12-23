let products =  require("./database/products.json")
const { v4:uuidv4 } = require('uuid');
// const uuid = require('uuid').v4
const { writeToFile } =  require('./filemanagement')


function displayAll(){
    return new Promise((reslove,reject)=>{
        reslove(products);
    })
    
}

function displayProductById(id){
    return new Promise((reslove,reject)=>{
        const probyid = products.find((prid)=>prid.productId===id)
        reslove( probyid)
    })
}



function addProduct(product){
    return new Promise((reslove,reject)=>{
     const newProduct = {productId:uuidv4(),...product}
     products.push(newProduct)
     //write to our products.json
     writeToFile('./database/products.json',products)
     reslove(newProduct)

    })
}
function edit(productId,produ){
    return new Promise((resolve,reject)=>{
        const findProduct = products.findIndex((p)=>p.productId===id);
        products[findProduct] = {productId,...produ};
        writeToFile('./database/products.json',products)
        resolve(products[findProduct]);
    })
}

function removeProduct(productId) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.productId !== productId)
        
            writeToFile('./database/products.json', products);
        
        resolve()
    })
}

module.exports = {
    displayAll,
    displayProductById,
    addProduct,
    edit,
    removeProduct
}
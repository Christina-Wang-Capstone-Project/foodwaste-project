const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
("use strict")

async function getAllProducts() {
    const query = new Parse.Query("Products")
    query.descending("createdAt")
    let allProducts = await query.find()
    return allProducts;
  }
  
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const User = new Parse.User()
        const query = new Parse.Query(User)
        let user = await query.get(userId)
        let allProducts = await getAllProducts() 
        let myProducts = []
        allProducts.filter((product) => {
            if (product.get("user").id === userId) {
                myProducts.push(product)
            }
        })
        res.send({user, myProducts})
}
    catch (err) {
        res.send(err)
       
    }
})


module.exports = router


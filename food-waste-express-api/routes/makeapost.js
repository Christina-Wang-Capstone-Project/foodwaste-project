const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
require('dotenv').config();
    
("use strict")

function getQuantity(product) {
    return product.get("quantity")
}

function getDistance(product) {
    return product.get("distance")
}

router.post('/', async (req, res, next) => {
    try {

    const products = new Parse.Object("Products", req.body)
    let currentUserId = req.headers["current_user_id"]
    const user = new Parse.User()
    user.id = currentUserId
    products.set("user", user)

    const contentType = 'image/png' 
    const file = new Parse.File('image', {base64: req.body.file}, contentType)
    await file.save()
    
    const quantity = req.body.quantity
    products.set("quantity", parseInt(quantity))
        
    products.set('file', file)

    await products.save()
    res.status(200).send({products})
    } 
    
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    
    try {
        const query = new Parse.Query("Products")
        query.ascending("distance")
        let allProducts = await query.find()
        let products = []
        allProducts.map((product) => {
            if (getQuantity(product) > 0 && getDistance(product) < process.env.DEFAULT_RANGE) {
            products.push(product)
        }
      })
      res.send({"products" : products})
  }catch (error) {
        res.status(400).send({ "error": "Products query failed" + error })
        
  }
})


  
module.exports = router
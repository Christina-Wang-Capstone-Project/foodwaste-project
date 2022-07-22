const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
("use strict")



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

    products.set('file', file)

    await products.save()
    res.status(201)
    res.send({ "products": products })
    } 
    
    catch (error) {
        console.log(error)
        res.status(400).send({error:error})
    }
})
router.get('/', async (req, res) => {
    try {
        const query = new Parse.Query("Products")
        query.descending("createdAt")
        products = await query.find()
  
        res.send({"products" : products})
    } catch (error) {
        res.status(400) 
        res.send({"error" : "Products query failed" + error})
        
  }
  })
  
module.exports = router
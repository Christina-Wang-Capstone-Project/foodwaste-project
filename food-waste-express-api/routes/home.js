const express = require("express")
const router = express.Router()
const Parse = require('parse/node');

router.get('/:objectId', async (req, res) => {
    const productId = req.params.objectId;
    try {
        const query = new Parse.Query("Products")
        let product = await query.get(productId)
        res.send({ product })
    }
    catch (err) {
        res.send({err})
    }
})

router.post('/:objectId', async (req, res) => {
    const productId = req.params.objectId;
    let currentUserId = req.headers["current_user_id"]
    try {
        const Product = Parse.Object.extend("Products")
        const query = new Parse.Query(Product)
        query.get(productId).then((product) => {
            product.addUnique("basket", currentUserId)
            product.save()
        })
        res.status(200).send("Success!")
    }
    catch (error) {
        console.log("Error adding to basket")
    }
})
module.exports = router
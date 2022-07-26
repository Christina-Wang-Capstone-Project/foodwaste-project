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

router.post('/basket', async (req, res) => {
    const productId = req.body.productId
    let currentUserId = req.headers["current_user_id"]
    try {
        const Product = Parse.Object.extend("Products")
        const query = new Parse.Query(Product)
        let product = await query.get(productId)

        let usersInBasket = product.get("basket");
        usersInBasket = usersInBasket.filter((user) => user !== currentUserId)
        product.set("basket", usersInBasket)
        product.save()
    }
    catch (error) {
        res.send(error)
        console.log("Error deleting item from basket")
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
        res.status(200).send("Successfully added item to basket.")
    }
    catch (error) {
        console.log("Error adding to basket")
    }
})

module.exports = router
const e = require("express");
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
("use strict")

function getUserBasket(currentUserId) {
    const Basket = Parse.Object.extend("Basket");
    const query = new Parse.Query(Basket)
    return query.equalTo("userId", currentUserId).first()
}

function getProduct(productId) {
    const Product = Parse.Object.extend("Products")
    const productQuery = new Parse.Query(Product)
    return productQuery.get(productId)
}

router.get("/addtobasket", async (req, res) => {
    const currentUserId = req.headers["current_user_id"]
    try {
        let userBasket = await getUserBasket(currentUserId) //gets the Basket object with the currentuserId
        let userBasketOfIds = await userBasket.get("basketOfProductId") //returns the array of ids
        let productsInBasket = []

        if (userBasketOfIds != null) {

            for (let productId of userBasketOfIds) {
                let product = await getProduct(productId)
                productsInBasket.push(product) 
            }
            res.status(200).send({ productsInBasket })
        }
        else {
            res.status(200).send({})
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
    
}) 

router.get("/onhold", async (req, res) => {
    const currentUserId = req.headers["current_user_id"]
    try {
        let userBasket = await getUserBasket(currentUserId)
        let userBasketOfProductIdsOnHold = await userBasket.get("productsOnHold")
        let productsOnHold = []

        for (let productId of userBasketOfProductIdsOnHold) {
            let product = await getProduct(productId)
            productsOnHold.push(product)
        }
        res.status(200).send({productsOnHold})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:objectId', async (req, res) => {
    const productId = req.params.objectId;
    try {
        
        let product = await getProduct(productId)
        res.send({ product })
    }
    catch (err) {
        res.status(400).send({err})
    }
})


router.post('/removefrombasket', async (req, res) => {
    const productId = req.body.productId
    let currentUserId = req.headers["current_user_id"]
    try {
        let userBasket = await getUserBasket(currentUserId)
        let userBasketOfIds = await userBasket.get("basketOfProductId") //returns first instance
        let productsInBasket = []

        if (userBasketOfIds != null) {
            userBasket.remove("basketOfProductId", productId)
            await userBasket.save()
            res.status(200).send({ productsInBasket })
        }
        else {
            res.status(200).send({})
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post("/onhold", async (req, res) => {
    const currentUserId = req.body.currentUserId
    try {
        let userBasket = await getUserBasket(currentUserId)
        let userBasketOfIds = await userBasket.get("basketOfProductId")
        for (let productId of userBasketOfIds) {
            userBasket.addUnique("productsOnHold", productId) //add to an on hold for easier retrieval
            let product = await getProduct(productId)
            product.set("isOnHoldBy", currentUserId)
            await product.save()
        }
        userBasket.set("basketOfProductId", [])
        await userBasket.save()

        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/:objectId', async (req, res) => {
    const productId = req.params.objectId
    const currentUserId = req.headers["current_user_id"]

    try {
        let userBasket = await getUserBasket(currentUserId) //returns first instance
        if (userBasket != null) {
            userBasket.addUnique("basketOfProductId", productId)
            await userBasket.save()
        }
        else {
            let basket = new Basket();
            basket.set("userId", currentUserId);
            basket.set("basketOfProductId", [productId])
            await basket.save();
        }
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

   


module.exports = router
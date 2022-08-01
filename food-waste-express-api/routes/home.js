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
        let userBasketOfIds = await userBasket.get("basketOfProducts") //returns the array of ids
        
        let productsInBasket = []

        if (userBasketOfIds != null) {

            for (let productDetails of userBasketOfIds) {
                let productId = productDetails.productId
                let product = await getProduct(productId)
                let basketQuantity = productDetails.quantity
                productsInBasket.push({ product, basketQuantity }) 
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
        let userBasketOfProductsOnHold = await userBasket.get("productsOnHold")
        
        let productsOnHold = []

        if (userBasket == null) {
            res.status(200).send({})
            return;
        }
        if (userBasketOfProductsOnHold == null) {
            res.status(200).send({})
            return;
        }
        for (let productDetail of userBasketOfProductsOnHold) {
            let product = await getProduct(productDetail.productId)
            let quantity = productDetail.quantity
            productsOnHold.push({ product, quantity })
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
    const quantity = req.body.quantity
    let currentUserId = req.headers["current_user_id"]
    try {
        let userBasket = await getUserBasket(currentUserId)
        let userBasketOfIds = await userBasket.get("basketOfProducts") //returns first instance
        let productsInBasket = []

        if (userBasketOfIds != null) {
            userBasket.remove("basketOfProducts", { productId, quantity})
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
        let userBasketOfIds = await userBasket.get("basketOfProducts")
        
        for (let productDetails of userBasketOfIds) {
            userBasket.addUnique("productsOnHold", productDetails) //add to an on hold for easier retrieval
            let product = await getProduct(productDetails.productId)
            let productQuantityLeft = (await product.get("quantity")) - productDetails.quantity;
            product.set("quantity", productQuantityLeft.toString())
            await product.save()
        }
        userBasket.set("basketOfProducts", [])
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
    const quantity = req.body.quantity
    
    try {
        let userBasket = await getUserBasket(currentUserId) //returns first instance
        let tempBasket = []

        if (userBasket != null) {
            let doesNotHaveDuplicate = true;
            if (userBasket.get("basketOfProducts").length > 0) {
                for (productDetail of userBasket.get("basketOfProducts")) {
                    if (productDetail.productId == productId) {
                        let newQuantity = productDetail.quantity + quantity
                        tempBasket.push({ "productId": productId, "quantity": newQuantity.toString() })
                        doesNotHaveDuplicate = false;
                    }
                    else {
                        tempBasket.push(productDetail)
                    }
                }
                userBasket.removeAll("basketOfProducts", { productId, quantity })
                userBasket.set("basketOfProducts", tempBasket)
                await userBasket.save()
            }
            if (doesNotHaveDuplicate) {
                userBasket.addUnique("basketOfProducts", { productId, quantity })
                await userBasket.save()
            }
        }
        else {
            const Basket = Parse.Object.extend("Basket");
            let basket = new Basket();
            basket.set("userId", currentUserId);
            basket.set("basketOfProducts", [{productId, quantity}])
            await basket.save();
        }
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send({ error })
    }
})

   


module.exports = router
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
        let userBasket = await getUserBasket(currentUserId)
        let userBasketOfIds = await userBasket.get("basketOfProductId") //returns first instance
        console.log("userBasketOfIds", userBasketOfIds)
        let productsInBasket = []

        if (userBasketOfIds != null) {

            for (let productId of userBasketOfIds) {
                let product = await getProduct(productId)
                productsInBasket.push(product) 
            }
            res.status(200).send({ productsInBasket })
            console.log("products after map in basket", productsInBasket)
        }
        else {
            res.status(200).send({})
        }
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
    
}) 

router.get('/:objectId', async (req, res) => {
    const productId = req.params.objectId;
    try {
        
        let product = await getProduct(productId)
        res.send({ product })
    }
    catch (err) {
        res.send({err})
    }
})


// router.post('/removefrombasket', async (req, res) => {
//     const productId = req.body.productId
//     let currentUserId = req.headers["current_user_id"]
//     try {
       
//         let product = await getProduct(productId)

//         let usersInBasket = product.get("basket"); 
//         usersInBasket = usersInBasket.filter((user) => user !== currentUserId)
//         product.set("basket", usersInBasket)
//         product.save()
//     }
//     catch (error) {
//         res.send(error)
//         console.log("Error deleting item from basket")
//     }
// })

router.post('/:objectId', async (req, res) => {
    const productId = req.params.objectId
    const currentUserId = req.headers["current_user_id"]

    try {
        let userBasket = await getUserBasket(currentUserId) //returns first instance
        console.log("userbasket", userBasket.get("basketOfProductId")) //returns array of productId
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
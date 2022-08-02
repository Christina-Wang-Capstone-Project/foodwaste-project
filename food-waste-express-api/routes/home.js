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

function getAllProductsInBasket(userBasket) {
    return userBasket.get("basketOfProducts")
}
    
function getAllProductsOnHold(userBasket) {
    return userBasket.get("productsOnHold")
}

function setProductsInBasket(userBasket,product) {
    return userBasket.set("basketOfProducts", product)
}

function setQuantity(product, quantity) {
return product.set("quantity", quantity.toString())
}

function removeProductFromBasket(userBasket, productId, quantity) {
   return userBasket.remove("basketOfProducts", {productId, quantity})
}

function addProductToBasket(userBasket, productId, quantity) {
    return userBasket.add("basketOfProducts", { productId, quantity })
}

function addProductOnHold(userBasket, product) {
   return userBasket.add("productsOnHold", product)

}

function getQuantity(product) {
   return product.get("quantity")
}

router.get("/addtobasket", async (req, res) => {
    const currentUserId = req.headers["current_user_id"]
    try {
        let userBasket = await getUserBasket(currentUserId) //gets the Basket object with the currentuserId
        if (userBasket == null) {
            res.status(200).send({});
            return;
        }
        let userBasketOfIds = await getAllProductsInBasket(userBasket)//returns the array of ids
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
        if (userBasket == null) {
            res.status(200).send({})
            return;
        }
        let userBasketOfProductsOnHold = await getAllProductsOnHold(userBasket)
        
        let productsOnHold = []

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
        let userBasketOfIds = await getAllProductsInBasket(userBasket) //returns first instance
        let productsInBasket = []

        if (userBasketOfIds != null) {
            removeProductFromBasket(userBasket, productId, quantity)
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
        let userBasketOfIds = await getAllProductsInBasket(userBasket)
        
        for (let productDetails of userBasketOfIds) {
            addProductOnHold(userBasket, productDetails) //add to an on hold for easier retrieval
            let product = await getProduct(productDetails.productId)
            let productQuantityLeft = (getQuantity(product)) - productDetails.quantity;
            setQuantity(product, productQuantityLeft)
            await product.save()
        }
        setProductsInBasket(userBasket, [])
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
            let allProductsInBasket = await getAllProductsInBasket(userBasket)
            if (allProductsInBasket.length > 0) {
                for (productDetail of allProductsInBasket) {
                    if (productDetail.productId == productId) {
                        let newQuantity = productDetail.quantity + quantity
                        tempBasket.push({ "productId": productId, "quantity": newQuantity.toString() })
                        doesNotHaveDuplicate = false;
                    }
                    else {
                        tempBasket.push(productDetail)
                    }
                }
                removeProductFromBasket(userBasket, productId, quantity)
                setProductsInBasket(userBasket, tempBasket)
                await userBasket.save()
            }
            if (doesNotHaveDuplicate) {
                addProductToBasket(userBasket, productId, quantity)
                await userBasket.save()
            }
        }
        else {
            const Basket = Parse.Object.extend("Basket");
            let basket = new Basket();
            basket.set("userId", currentUserId);
            setProductsInBasket(basket, [{productId, quantity}])
            await basket.save();
        }
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send({ error })
    }
})

   


module.exports = router
const e = require("express");
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
("use strict")

const current_user_id = "current_user_id"
const basket_of_products = "basketOfProducts"
const products_on_hold = "productsOnHold"
const is_picked_up = "isPickedUp"

router.get("/addtobasket", async (req, res) => {
    const currentUserId = req.headers[current_user_id]
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
    const currentUserId = req.headers[current_user_id]
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
    let currentUserId = req.headers[current_user_id]
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

router.post("/pickedup", async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    const currentUserId = req.headers[current_user_id]
    try {
        let userBasket = await getUserBasket(currentUserId)
        console.log("quantity", quantity)
        addProductToIsPickedUp(userBasket, productId, quantity)
        await userBasket.save();
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post("/reversepickup", async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    const currentUserId = req.headers[current_user_id]
    try {
        let userBasket = await getUserBasket(currentUserId)
        reversePickedUpProductToOnHold(userBasket, productId, quantity)
        await userBasket.save();
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post("/deleteoffonhold", async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    const currentUserId = req.headers[current_user_id]

    try {
        let userBasket = await getUserBasket(currentUserId)
        deleteProductOffOnHold(userBasket, productId, quantity)
        await userBasket.save();
        res.status(200).send({})
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/:objectId', async (req, res) => {
    const productId = req.params.objectId
    const currentUserId = req.headers[current_user_id]
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
                        tempBasket.push({ "productId": productId, "quantity": newQuantity })
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
    return userBasket.get(basket_of_products)
}
    
function getAllProductsOnHold(userBasket) {
    return userBasket.get(products_on_hold)
}

function setProductsInBasket(userBasket,product) {
    return userBasket.set(basket_of_products, product)
}

function setQuantity(product, quantity) {
return product.set("quantity", quantity)
}

function removeProductFromBasket(userBasket, productId, quantity) {
   return userBasket.remove(basket_of_products, {productId, quantity})
}

function addProductToBasket(userBasket, productId, quantity) {
    return userBasket.add(basket_of_products, { productId, quantity })
}

function addProductOnHold(userBasket, product) {
   return userBasket.add(products_on_hold, product)
}

function getQuantity(product) {
   return product.get("quantity")
}

function addProductToIsPickedUp(userBasket, productId, quantity) {
    if (userBasket.get(is_picked_up) == null) {
        userBasket.set(is_picked_up, [{ productId, quantity }])
        return userBasket.remove(products_on_hold, {productId, quantity})
    }
    userBasket.add(is_picked_up, { productId, quantity })
    return userBasket.remove(products_on_hold, {productId, quantity})
}

function reversePickedUpProductToOnHold(userBasket, productId, quantity) {
    userBasket.addUnique(products_on_hold, { productId, quantity })
    return userBasket.remove(is_picked_up, { productId, quantity })
}
   
async function deleteProductOffOnHold(userBasket, productId, quantity) {
    userBasket.remove(products_on_hold, { productId, quantity })
    let curProduct = await getProduct(productId);
    let newQuantity = await getQuantity(curProduct) + quantity
    curProduct.set("quantity", newQuantity)
    await curProduct.save()
}

module.exports = router
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
const app = express()

router.post('/', async (req, res, next) => {
    try {
        console.log("is it running this")
        const products = new Parse.Object("Product", req.body)
        currentUserId = req.headers["current_user_id"]
        const user = new Parse.User()
        user.id = currentUserId
        products.set("user", user)

        await products.save()
        res.status(201)
        res.send({"products" : products})
    }
    catch (error) {
        res.status(400)
        res.send(error)
    }
})
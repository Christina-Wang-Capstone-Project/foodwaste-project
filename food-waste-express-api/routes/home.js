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
module.exports = router
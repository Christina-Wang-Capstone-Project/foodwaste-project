require('dotenv').config()
const e = require("express");
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
const { __RouterContext } = require("react-router");
var axios = require('axios');

("use strict")
const distance = "distance"

router.post('/', async (req, res) => {
    let userLocation = req.body.userLocation
    let allProducts = await getAllProducts()
    try {
        allProducts.map(async (product) => {
            let productLocation = await product.get("location")
            let productId = await product.id
            getDistance(userLocation, productLocation, productId)
        })
    }
    catch (error) {
        throw (error)
    }
})

async function getAllProducts() {
    const query = new Parse.Query("Products")
    let allProducts = await query.find()
    return allProducts
}
function getProduct(productId) {
    const Product = Parse.Object.extend("Products")
    const productQuery = new Parse.Query(Product)
    return productQuery.get(productId)
}

function getDistance(userLocation, productLocation, productId) {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation[0]}%2C${userLocation[1]}&destinations=${productLocation[0]}%2C${productLocation[1]}&key=${process.env.GOOGLE_API_KEY}&units=imperial`,
        headers: { }
    };
    axios(config)
    .then(async function (response) {
        let distanceAway = JSON.stringify(response.data.rows[0].elements[0].distance.text);
        distanceAway = distanceAway.substring(1, distanceAway.length - 3)
        distanceAway = parseInt(distanceAway)
        let product = await getProduct(productId)
        product.set(distance, distanceAway)
        await product.save()
    })
    .catch(function (error) {
      console.log(error);
    });
}



module.exports = router
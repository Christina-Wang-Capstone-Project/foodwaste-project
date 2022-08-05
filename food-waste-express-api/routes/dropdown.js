const e = require("express");
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
("use strict")

        
router.get("/:option", async (req, res) => {
    const dropdownOption = req.params.option;
    let products = []
    if (dropdownOption == 0) {
        products = await handleSortDistanceLowToHigh();
    }
    else if (dropdownOption == 1) {
        products = await handleSortDistanceHighToLow();
    } 

    else if (dropdownOption == 2) {
        products = await handleNewestArrivals();
    }
    else {
        products = await handleAboutToExpire()
    }
    res.status(200).send({products})
})

async function handleSortDistanceLowToHigh() {
    const query = new Parse.Query("Products")
    query.ascending("distance")
    let allProducts = await query.find()
    return allProducts
}

async function handleSortDistanceHighToLow() {
    const query = new Parse.Query("Products")
    query.descending("distance")
    let allProducts = await query.find()
    return allProducts
}

async function handleNewestArrivals() {
    const query = new Parse.Query("Products")
    query.descending("createdAt")
    let allProducts = await query.find()
    return allProducts 
}

async function handleAboutToExpire() {
    const query = new Parse.Query("Products")
    query.ascending("date")
    let allProducts = await query.find()
    return allProducts 
}


module.exports = router
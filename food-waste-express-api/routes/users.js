const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
const app = express()
const cors = require('cors')

router.post('/:userId', async (req, res) => {
    try {
        const user = new Parse.Query("User")
        
}
    catch (err) {
        res.send(err)
    }
})
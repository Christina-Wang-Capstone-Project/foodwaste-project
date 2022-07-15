const express = require("express")
const router = express.Router()
const Parse = require('parse/node');

router.post('/', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password)
        res.send({ "user": user })
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
})


  
module.exports = router
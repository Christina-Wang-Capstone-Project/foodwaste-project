const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
const app = express()
const cors = require('cors')
var FileReader = require('filereader')

router.post('/', async (req, res, next) => {
    //try {
      const products = new Parse.Object("Product", req.body)
        currentUserId = req.headers["current_user_id"]
        const user = new Parse.User()
        user.id = currentUserId
      products.set("user", user)

        var reader = new FileReader();

        reader.readAsBinaryString(req.body.file);
    
        const data = Array.from(reader.result)
        const contentType = 'image/png' 
        const file = new Parse.File('image', data, contentType)
        file.save()

        products.set('file', file)
     
      await products.save()
      res.status(201)
      res.send({ "products": products })
    //} 
    
    // catch (error) {
    //     res.status(400)
    //     res.send(error)
    // }
})
  
module.exports = router
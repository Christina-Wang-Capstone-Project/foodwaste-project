
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const app = express()
const makeAPostRouter = require('./routes/makeapost.js')


app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

const APP_ID = "2A8F3yGEfmsecpGdBs8LGhJT4qAg5fLX9AtwJmnD"
const JS_KEY = "hpNlfJsUWRsw4vXfrBRxcbhiYgMkENQd5hhNTcPp"

Parse.initialize(
    `${APP_ID}`, `${JS_KEY}`
  );
  //Point to Back4App Parse API address
  Parse.serverURL = "https://parseapi.back4app.com";

  app.post('/register', async (req, res) => {
    let user = new Parse.User(req.body)
  
    try {
        await user.signUp()
        res.status(201)    
        res.send({"user" : user})
    } catch (error) {
        res.status(400)
        res.send({"error" : "Failed to create user: " + error })
    }
  })
  
  app.post('/login', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password)
      res.send({"user" : user})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
  }) 


  app.post('/makeapost', async (req, res, next) => {
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
  
module.exports = app //makes it like export default function
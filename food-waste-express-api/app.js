
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const app = express()


app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(
    "2A8F3yGEfmsecpGdBs8LGhJT4qAg5fLX9AtwJmnD",
    "hpNlfJsUWRsw4vXfrBRxcbhiYgMkENQd5hhNTcPp"
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
  
  
module.exports = app //makes it like export default function
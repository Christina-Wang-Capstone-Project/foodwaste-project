
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const app = express()
const makeAPostRouter = require('./routes/makeapost.js')
const userIdRouter = require('./routes/users.js')
const loginRouter = require('./routes/login.js')

app.use(express.json({limit: '50mb'}))
app.use(morgan("tiny"))
app.use(cors())



const APP_ID = "2A8F3yGEfmsecpGdBs8LGhJT4qAg5fLX9AtwJmnD"
const JS_KEY = "hpNlfJsUWRsw4vXfrBRxcbhiYgMkENQd5hhNTcPp"

Parse.initialize(
    `${APP_ID}`, `${JS_KEY}`
  );
  //Point to Back4App Parse API address
Parse.serverURL = "https://parseapi.back4app.com";

app.use('/makeapost', makeAPostRouter)
app.use('/user', userIdRouter)
app.use('/login', loginRouter)
  
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
  

  
  
module.exports = app //makes it like export default function
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const app = express()
const makeAPostRouter = require('./routes/makeapost.js')
const userIdRouter = require('./routes/users.js')
const loginRouter = require('./routes/login.js')
const homeRouter = require('./routes/home.js')
const dropDownRouter = require('./routes/dropdown.js')
const locationRouter = require('./routes/location')
const emailRouter = require('./routes/email')
const path = require('path');
const publicPath = path.join(__dirname, '..', 'food-waste-ui/dist');

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(express.json({limit: '50mb'}))
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(
    process.env.APP_ID, process.env.JS_KEY
  );
  //Point to Back4App Parse API address
Parse.serverURL = "https://parseapi.back4app.com";

app.use('/makeapost', makeAPostRouter)
app.use('/user', userIdRouter)
app.use('/login', loginRouter)
app.use('/home', homeRouter)
app.use('/dropdown', dropDownRouter)
app.use('/location', locationRouter)
app.use('/email', emailRouter)
  
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
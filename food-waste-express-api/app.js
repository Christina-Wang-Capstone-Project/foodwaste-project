
const express = require('express') //wiring the server
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express() 
const Parse = require('parse');
const cors = require('cors')

app.use(cors()) //allows access from other websites in, reason why product detail wasn't loading
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('tiny')) 
Parse.initialize("2A8F3yGEfmsecpGdBs8LGhJT4qAg5fLX9AtwJmnD", "hpNlfJsUWRsw4vXfrBRxcbhiYgMkENQd5hhNTcPp" ) //APP ID, JS Key
Parse.serverURL = `http://localhost:3001/parse`
    
app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"})
})

// Request the Log in passing the email and password
app.post('/users/login', async(req, res) => {
    let infoUser = req.body;
    
    try{
      let user = await Parse.User.logIn(infoUser.usernameLogin, infoUser.passwordLogin)
      res.render('index', { loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser });
    } catch (error){
      res.render('index', { loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
    }
  });
  
  // Register the user passing the username, password and email
  app.post('/', async(req, res) => {
    let infoUser = req.body;    
    let user = new Parse.User();
  
    user.set("username", infoUser.user);
      user.set("password", infoUser.pwd);
      console.log(user)
    //user.set("email", infoUser.emailRegister);
  
    try{
      await user.signUp();
      res.render('index', { loginMessage : '', RegisterMessage: "User created!", typeStatus: "success",  infoUser: infoUser});
    } catch (error) {
      res.render('index', { loginMessage : '', RegisterMessage: error.message, typeStatus: "danger",  infoUser: infoUser});
    }
  });



module.exports = app //makes it like export default function
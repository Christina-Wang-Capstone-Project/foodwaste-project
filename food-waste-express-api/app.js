const store = require('./models/store')
const express = require('express') //wiring the server
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express() 
const storeRouter = require("./routes/store");
const cors = require('cors')

app.use(cors()) //allows access from other websites in, reason why product detail wasn't loading
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('tiny')) 

app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"})
})



module.exports = app //makes it like export default function
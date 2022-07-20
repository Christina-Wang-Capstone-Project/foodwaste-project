const express = require("express")
const router = express.Router()
const Parse = require('parse/node');


router.post('/', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password)
      res.send({ "user": user })
    } catch (error) {
      res.status(101)
      res.send({"error" : "Login failed: " + error })
    }
})

router.put('/', async (req, res) => {
  const userId = req.body.objectId;
  const User = new Parse.User()
  const query = new Parse.Query(User)
  try {
    let user = await query.get(userId)
    console.log("USER FJWE", user)
    console.log("locationijrf", req.body.location)
     user.set('location', req.body.location)
    await user.save()
    try {
      // Saves the user with the updated data
      let response = await user.save();
      console.log('Updated user', response);
    } catch (error) {
      console.error('Error while updating user', error);
    }
  } catch (error) {
    console.error('Error while retrieving user', error);
  }
})
  
module.exports = router
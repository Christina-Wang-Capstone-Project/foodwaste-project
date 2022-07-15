const express = require("express")
const router = express.Router()
const Parse = require('parse/node');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const User = new Parse.User()
        const query = new Parse.Query(User)
        let user = await query.get(userId)
        res.send({user})
}
    catch (err) {
        res.send(err)
    }
})
// (async () => {
//     const User = new Parse.User();
//     const query = new Parse.Query(User);
  
//     try {
//       let user = await query.get('hEPjkt4epS');
//       console.log('User found', user);
//     } catch (error) {
//       console.error('Error while fetching user', error);
//     }
//   })();
module.exports = router
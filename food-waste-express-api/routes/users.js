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


module.exports = router
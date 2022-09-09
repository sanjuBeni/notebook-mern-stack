const express = require('express');
const router = express.Router();
const User = require('../mongoose_module/Users');

// Create a user using POST method --- End Point is --> /api/auth

router.post('/', (req, res) => {
    const user = User(req.body);
    user.save();
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
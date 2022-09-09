const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("It's note router");
});

module.exports = router;
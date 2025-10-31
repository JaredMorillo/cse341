const router = require("express").Router();

router.use('/', require('./swagger.js'))

router.get("/", (req, res) => {
    //#swagger.tags=['Hello from Routes']
    res.send("Hello from Routes")
})

router.use('/contacts', require('./contacts'))

module.exports = router
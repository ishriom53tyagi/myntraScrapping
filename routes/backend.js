const express = require('express')
const router = express.Router()

//services start Here
const userService = require('../services/userService')

router.get("/" , userService.getuserWishPage)
router.get("/userWish" , userService.getuserWishPage)
router.post('/submit', userService.saveUserWish)


module.exports = router

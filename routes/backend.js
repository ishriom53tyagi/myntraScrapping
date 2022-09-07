const express = require("express");
const router = express.Router();

const userService = require('../services/userService')
const cron = require('../services/cron')

router.get("/" , userService.getuserWishPage)
router.get("/userWish" , userService.getuserWishPage)
router.post('/submit', userService.saveUserWish)

router.get("/cron" , cron.cron)

module.exports = router;

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/", userService.getuserWishPage);
router.post("/submit", userService.saveUserWish);

module.exports = router;

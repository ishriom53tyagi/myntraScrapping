const express = require("express");
const router = express.Router();

const userService = require("../services/userService");
//const whatsapp = require("../services/whatsapp");
const email = require("../services/email");
const cron = require("../services/cron");

router.get("/userWish", userService.getuserWishPage);
router.post("/submit", userService.saveUserWish);

//router.get("/whatsapp", whatsapp.startWhatsappCampagin);
router.get("/email", email.startEmailCampaign);

// router.get("/cron", cron.cron);

module.exports = router;

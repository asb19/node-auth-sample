const express = require("express");
const router = express.Router();


const {
  loginWithPhoneOtp,
  signup,
  verifyOtpController
} = require("../controller/auth.controller");


router.post("/signup", signup);

router.post("/login", loginWithPhoneOtp);


router.post("/verify", verifyOtpController);


module.exports = router;
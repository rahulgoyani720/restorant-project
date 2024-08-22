const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/auth_controller");

//routes

//register post 
router.post("/register",authcontroller.UserSingUp);

//login post
router.post("/login",authcontroller.userSingIn);

module.exports = router
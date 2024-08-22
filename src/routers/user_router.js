const express = require("express");
const urouter = express.Router();
const usercontroller = require("../controller/user_controller");
const auth_middleware = require("../middlewares/auth_middleware");

//routes
//user fill
urouter.get("/userfill",auth_middleware,usercontroller.UserFill);

//userupdate
urouter.post("/update",auth_middleware,usercontroller.UpdateUser);

//password reset
urouter.post("/resetpassword",auth_middleware,usercontroller.ResetPassword);


//update password 
urouter.post("/updatepassword",auth_middleware,usercontroller.UpdatePassword);

//delete user profile
urouter.delete("/deleteuser/:id",usercontroller.DeleteProfile);


module.exports = urouter
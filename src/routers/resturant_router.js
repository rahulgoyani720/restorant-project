const express = require("express");
const rrouter = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const resturant_controller = require("../controller/resturant_controller");

//create resturant
rrouter.post("/create",auth_middleware,resturant_controller.CreateResturant);

//get all resturant
rrouter.get("/getallresturant",resturant_controller.GetAllResturant);

//get  resturant by id
rrouter.get("/getresturant/:id",resturant_controller.GetResturantById);

//delete resturant
rrouter.delete("/delete/:id",auth_middleware,resturant_controller.DeleteResturant);

module.exports = rrouter
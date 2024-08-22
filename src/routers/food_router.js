const express = require("express");
const frouter = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const food_controller = require("../controller/food_controller");


// create food 
frouter.post("/createfood",auth_middleware,food_controller.CreateFood);


// get all food 
frouter.get("/getallfood",food_controller.GetAllFood);

// get single food 
frouter.get("/getfood/:id",food_controller.GetFoodById);

// get  food by resturant
frouter.get("/getfoodbyresturant/:id",food_controller.GetFoodByResturantId);

//update category
frouter.put("/update/:id",auth_middleware,food_controller.UpdateFood);

//update category
frouter.delete("/delete/:id",auth_middleware,food_controller.DeleteFood);

module.exports = frouter;
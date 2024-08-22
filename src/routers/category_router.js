const express = require("express");
const crouter = express.Router();
const auth_middleware = require("../middlewares/auth_middleware");
const category_controller = require("../controller/catetory_controller");

//create category
crouter.post("/createcategory",auth_middleware,category_controller.CreateCategory);

//get all category
crouter.get("/getall",category_controller.GetAllCategory);

//update category
crouter.put("/update/:id",auth_middleware,category_controller.UpdateCategory);

//update category
crouter.delete("/delete/:id",auth_middleware,category_controller.DeleteCategory);

module.exports = crouter;
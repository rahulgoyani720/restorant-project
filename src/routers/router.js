const express = require("express");
const router = require("./auth_router");
const urouter = require("./user_router");
const rrouter = require("./resturant_router");
const crouter = require("./category_router");
const frouter = require("./food_router");
const orouter = require("./order_router");
const allRouter = express.Router();

allRouter.use("/user",router);
allRouter.use("/auth",urouter);
allRouter.use("/resturant",rrouter);
allRouter.use("/category",crouter);
allRouter.use("/food",frouter);
allRouter.use("/order",orouter);




module.exports = allRouter;
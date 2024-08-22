const express = require("express");
const orouter = express.Router();
const order_controller = require("../controller/order_controller");
const auth_middleware = require("../middlewares/auth_middleware");
const admin_middleware = require("../middlewares/admin_middleware");


// place order 
orouter.post("/placeorder",auth_middleware,order_controller.PlaceOrder);

// order status
orouter.post("/orderstatus/:id",auth_middleware,admin_middleware,order_controller.OrderStatus);

module.exports = orouter;
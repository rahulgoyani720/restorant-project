const order_model = require("../models/order_model");

const PlaceOrder = async (req,res) => {

    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({ status: 0,message: "cart not found" });
        }
        let total = 0;
        //calculate
        cart.map((i) => {
            total += i.price
        });

        const neworder = await order_model({
            foods: cart,
            payment: total,
            buyer: req.body.id
        });

        await neworder.save();
        res.status(201).send({ status: 1,message: "Order Placed Successfully",data: neworder });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "internal server error",error });
    }
}


// order status
const OrderStatus = async (req,res) => {

    try {
        const orderid = req.params.id;
        if (!orderid) {
            return res.status(404).send({ status: 0,message: " please provid valid orderid " });
        }
        const { status } = req.body;
        if (!status) {
            return res.status(404).send({ status: 0,message: "please provid order status" });
        }
        const order = await order_model.findByIdAndUpdate(orderid,{ status },{ new: true });

        if (!order) {
            return res.status(404).send({ status: 0,message: "please enter order" });
        }

        res.status(200).send({ status: 1,message: "order status updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "internal order status error",error });
    }
}
module.exports = {
    PlaceOrder,
    OrderStatus
}
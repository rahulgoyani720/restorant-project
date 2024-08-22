const user_model = require("../models/user_model");

module.exports = async (req,res,next) => {
    try {
        const user = await user_model.findById(req.body.id);
        if (user.usertype !== "admin") {
            return res.status(500).send({ status: 0,message: "Only Admin Access" });
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "UN-authrized access",error })
    }
}
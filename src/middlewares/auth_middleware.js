const jwt = require("jsonwebtoken");
const CONFIG = require("../configs/config");

module.exports = async (req,res,next) => {
    try {

        //get token
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,CONFIG.secret_key,(err,decode) => {

            if (err) {
                return res.status(401).send({ status: 0,message: "un-authorize user" });
            } else {
                req.body.id = decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "auth api error",error })
    }
}
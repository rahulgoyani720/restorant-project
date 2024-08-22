
const user_model = require("../models/user_model");
const CONFIG = require("../configs/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




//register
const UserSingUp = async (req,res) => {
    try {
        const { username,email,phone,password,address,answer } = req.body;

        // Validation
        if (!username || !email || !phone || !password || !address || !answer) {
            return res.status(400).send({ status: 0,message: "All fields are required" });
        }

        // Check if the email already exists
        const existing = await user_model.findOne({ email });
        if (existing) {
            return res.status(400).send({ status: 0,message: "Email already exists. Please login" });
        }


        //pasword hasing
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(password,salt);


        // Create a new user
        const user = await user_model.create({
            username,
            email,
            password: hashpassword,
            phone,
            address,
            answer
        });


        res.status(201).send({ status: 1,message: "Successfully registered",data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Error in register API" });
    }
};



// user login
const userSingIn = async (req,res) => {
    try {
        const { email,password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ status: 0,message: "Please provide email and password" });
        }
        // console.log(`Looking for user with email: ${email}`);
        const user = await user_model.findOne({ email: email.toLowerCase() });
        // console.log(`User found: ${user}`);
        if (!user) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        const ismatch = await bcrypt.compare(password,user.password);
        if (!ismatch) {
            return res.status(401).send({ status: 0,message: "Invalid password" });
        }

        //token genrate
        const token = jwt.sign({ id: user._id },CONFIG.secret_key,{ expiresIn: "7d" });
        res.status(200).send({ status: 1,message: "Login successfully",token,data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Error in login API",error });
    }
}



module.exports = {
    UserSingUp,
    userSingIn,
}
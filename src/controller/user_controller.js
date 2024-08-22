
const mongoose = require('mongoose');
const user_model = require("../models/user_model");
const bcrypt = require("bcryptjs");

//user fill in database
const UserFill = async (req,res) => {
    try {
        //find user
        const user = await user_model.findById(req.body.id);

        //validation
        if (!user) {
            return res.status(500).send({ status: 0,message: " user not found" });
        }
        res.status(200).send({ status: 1,message: "get user successfully",data: user });


    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "please provide auth token",error });
    }
}

// user update profile
const UpdateUser = async (req,res) => {
    try {
        const { id } = req.body;
        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: 0,message: "Invalid or missing ID" });
        }

        console.log(`Request ID: ${id}`);

        // Find user by ID
        const user = await user_model.findById(id);

        // Log user found
        console.log('User found:',user);

        // Validation for user existence
        if (!user) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        console.log('User before update:',user);

        // Update fields if present
        const { username,address,phone,answer } = req.body;

        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        if (answer) user.answer = answer;

        // Save updated user
        await user.save();

        console.log('User after update:',user);
        res.status(200).send({ status: 1,message: "User Updated Successfully",data: user });

    } catch (error) {
        console.log('Error in update user API:',error);
        res.status(500).send({ status: 0,message: "Error in update user API",error });
    }
};


//resetpassword
const ResetPassword = async (req,res) => {

    try {

        const { email,newpassword,answer } = req.body;

        if (!email || !newpassword || !answer) {
            return res.status(500).send({ status: 0,message: "user field is mismatch" });
        }

        const user = await user_model.findOne({ email,answer });
        if (!user) {
            return res.status({ status: 0,message: "user not found and invalid answer" });
        }

        //pasword hasing
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newpassword,salt);
        user.password = hashpassword;
        await user.save();
        res.status(200).send({ status: 1,message: "password reset successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error in password reset api" })
    }
}

//updatepassword
const UpdatePassword = async (req,res) => {

    try {
        const user = await user_model.findById({ _id: req.body.id });

        // console.log(user);
        if (!user) {
            return res.status(500).send({ status: 0,message: "user not found" });
        }

        const { oldpassword,newpassword } = req.body;

        if (!oldpassword || !newpassword) {
            return res.status(500).send({ status: 0,message: "user password mismatch" });
        }

        const ismatch = await bcrypt.compare(oldpassword,user.password);
        if (!ismatch) {
            return res.status(401).send({ status: 0,message: "Invalid old password" });
        }

        //pasword hasing
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newpassword,salt);
        user.password = hashpassword;
        await user.save();


        res.status(200).send({ status: 1,message: "Password Updated" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error update password api",error });
    }
}

//delete user profile 
const DeleteProfile = async (req,res) => {
    try {

        await user_model.findByIdAndDelete(req.params.id);
        return res.status(200).send({ status: 1,message: "account deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error delete profile api",error });
    }
}
module.exports = {
    UserFill,
    UpdateUser,
    ResetPassword,
    UpdatePassword,
    DeleteProfile
}
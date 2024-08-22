const mongoose = require("mongoose");

//schema
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"]
    },
    profile: {
        type: String,
        default: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"password is required"]
    },
    address: {
        type: [String],
    },
    phone: {
        type: String,
        required: [true,"phone number is required"]
    },
    usertype: {
        type: String,
        required: [true,"user type is required"],
        default: "client",
        enum: ["client","admin","vendor","driver"]
    },
    answer: {
        type: String,
        required: [true,"answer is required"]

    }
},{
    timestamps: true
});

//export

module.exports = mongoose.model("user",userschema)
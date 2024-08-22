const mongoose = require("mongoose");

//schema
const categoryschema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"title is required"]
    },
    imageurl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYt2sYy0HE0JPF-cutjOBXk704kh8aDeTDiA&s"
    }
},

    {
        timestamps: true
    });

//export

module.exports = mongoose.model("Category",categoryschema)
const mongoose = require("mongoose");

//schema
const foodschema = new mongoose.Schema({

    title: {
        type: String,
        required: [true,"food title is required"]
    },
    description: {
        type: String,
        required: [true,"food description is required"]
    },
    price: {
        type: Number,
        required: [true,"food price is requied"]
    },
    imageurl: {
        type: String,
        default: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg"
    },
    foodtags: {
        type: String
    },
    category: {
        type: String
    },
    code: {
        type: String
    },
    isavailable: {
        type: Boolean,
        default: true
    },
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturant"
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    }
},

    {
        timestamps: true
    });

//export

module.exports = mongoose.model("Foods",foodschema)
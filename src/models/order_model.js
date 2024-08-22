const mongoose = require("mongoose");

//schema
const orderschema = new mongoose.Schema({
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods"
    }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        enum: ["preparing","pripare","on the way","delivery"],
        default: "preparing"
    }
},

    {
        timestamps: true
    });

//export

module.exports = mongoose.model("order",orderschema)
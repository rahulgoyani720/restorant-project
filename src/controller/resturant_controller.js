const mongoose = require("mongoose");
const resturant_model = require("../models/resturant_model");

//create resturant
const CreateResturant = async (req,res) => {
    try {

        const { title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isopen,
            logourl,
            rating,
            ratingCount,
            code,
            coords } = req.body;
        if (!title || !coords) {
            return res.status(500).send({ status: 0,message: "data not found" });
        }

        const newResturant = await resturant_model.create({
            title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isopen,
            logourl,
            rating,
            ratingCount,
            code,
            coords
        });

        await newResturant.save();
        res.status(200).send({ status: 1,message: "new resturant created" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error  create resturant api",error });
    }
}


// get all resturant
const GetAllResturant = async (req,res) => {
    try {
        const resturantdata = await resturant_model.find({});
        if (!resturantdata) {
            return res.status(404).send({ status: 0,message: " no resturant avalable " });
        }
        res.status(200).send({ status: 1,message: "get data ok",totalCount: resturantdata.length,data: resturantdata });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "get all resturant api error",error });
    }
}



// get resturant by id

const GetResturantById = async (req,res) => {
    try {
        const { id } = req.params;
        // console.log(id);

        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: 0,message: "Invalid or missing ID" });
        }

        // console.log(`Fetching restaurant with ID: ${id}`);

        // Find restaurant by ID
        const resturant = await resturant_model.findById(id);
        // console.log(resturant);

        // Validation for restaurant existence
        if (!resturant) {
            return res.status(404).send({ status: 0,message: "Restaurant not found" });
        }

        res.status(200).send({ status: 1,message: "Data retrieved successfully",data: resturant });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Error retrieving restaurant data",error });
    }
};

//delete resturant
const DeleteResturant = async (req,res) => {
    try {
        await resturant_model.findByIdAndDelete(req.params.id);
        return res.status(200).send({ status: 1,message: "Delete Resturant Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error delete resturant api",error });
    }
}
module.exports = {
    CreateResturant,
    GetAllResturant,
    GetResturantById,
    DeleteResturant
}
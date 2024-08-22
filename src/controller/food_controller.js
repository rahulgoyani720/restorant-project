const mongoose = require("mongoose");
const food_model = require("../models/food_model");

//create food
const CreateFood = async (req,res) => {
    try {
        const { title,description,price,imageurl,foodtags,category,code,isavailable,resturant,rating,ratingCount } = req.body;

        if (!title || !description || !price || !resturant) {
            return res.status(500).send({ status: 0,message: "please provid all fields" })
        }

        const newfood = await food_model({
            title,
            description,
            price,
            imageurl,
            foodtags,
            category,
            code,
            isavailable,
            resturant,
            rating,
            ratingCount
        });
        await newfood.save();
        res.status(200).send({ status: 1,message: "Created Food Successfully",data: newfood });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error to create food",error });
    }
}

//get all food
const GetAllFood = async (req,res) => {
    try {
        const foods = await food_model.find();
        // res.json(foods);
        if (!food_model) {
            return res.status(404).send({ status: 0,message: "food not found" });
        }

        return res.status(200).send({ status: 1,message: "getAllfood ok",foods });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error get all food ",error });
    }
}

//get single food by id
const GetFoodById = async (req,res) => {
    try {

        const { id } = req.params;
        console.log(id);

        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: 0,message: "Invalid or missing ID" });
        }

        const food = await food_model.findById(id);
        console.log(food);

        // Validation for restaurant existence
        if (!food) {
            return res.status(404).send({ status: 0,message: "food not found" });
        }

        res.status(200).send({ status: 1,message: "Data retrieved successfully",data: food });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "server internal error",error });
    }
}

//get food by resturant id 
const GetFoodByResturantId = async (req,res) => {
    try {

        const { resturantid } = req.params;
        // console.log(resturantid);

        const food = await food_model.find(resturantid);
        console.log(food);

        // Validation for restaurant existence
        if (!food) {
            return res.status(404).send({ status: 0,message: "food not found" });
        }

        res.status(200).send({ status: 1,message: "food base on resturant",data: food });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "server internal error",error });
    }
}


//update food item
const UpdateFood = async (req,res) => {

    try {

        const foodid = req.params.id;
        if (!foodid) {
            return res.status(500).send({ status: 0,message: "food not found" });
        }

        const food = await food_model.findById(foodid);
        if (!food) {
            return res.status(500).send({ status: 0,message: "food not found on resturant" });
        }
        const {
            title,
            description,
            price,
            imageurl,
            foodtags,
            category,
            code,
            isavailable,
            resturant,
            rating,
            ratingCount
        } = req.body;

        const updatedfood = await food_model.findByIdAndUpdate(foodid,{
            title,
            description,
            price,
            imageurl,
            foodtags,
            category,
            code,
            isavailable,
            resturant,
            rating,
            ratingCount
        },{ new: true });

        res.status(200).send({ status: 1,message: "food Updated Successfully",data: updatedfood });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "internal server error",error });
    }
}

const DeleteFood = async (req,res) => {

    try {

        const { id } = req.params;
        if (!id) {
            return res.status({ status: 0,message: "food not found" });
        }

        const food = await food_model.findById(id);
        if (!food) {
            return res.status(500).send({ status: 0,message: "food not found" });
        }
        await food_model.findByIdAndDelete(id);
        return res.status(200).send({ status: 1,message: "Food Deleted Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "internal server error",error });
    }
}
module.exports = {
    CreateFood,
    GetAllFood,
    GetFoodById,
    GetFoodByResturantId,
    UpdateFood,
    DeleteFood
}
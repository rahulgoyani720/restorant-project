const category_model = require("../models/category_model");

//create category
const CreateCategory = async (req,res) => {
    try {
        const { title,imageurl } = req.body;

        if (!title) {
            return res.status(500).send({ status: 0,message: "please provide category title or imageurl" });
        }

        const newCategory = await category_model({ title,imageurl });
        await newCategory.save();
        res.status(200).send({ status: 1,message: "Category Created Successfully",data: newCategory });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "error create  category api",error });
    }
}

//get all category
const GetAllCategory = async (req,res) => {
    try {

        const getdata = await category_model.find({});
        if (!getdata) {
            return res.status(500).send({ status: 0,message: "data not found" });
        }
        res.status(200).send({ status: 1,message: "ok",data: getdata });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "get all category error",error });
    }
}

// update category
const UpdateCategory = async (req,res) => {
    try {
        const { id } = req.params;
        const { title,imageurl } = req.body;

        // Find user by ID
        const user = await category_model.findByIdAndUpdate(id,{ title,imageurl },{ new: true });

        if (!user) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        res.status(200).send({ status: 1,message: "catergory updated successfully",Data: user });

    } catch (error) {

        console.log(error);
        res.status(500).send({ status: 0,message: "error to update category",error });
    }
}


//delete category
const DeleteCategory = async (req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({ status: 0,message: "please provid category id" });
        }
        await category_model.findByIdAndDelete(id);
        return res.status(200).send({ status: 1,message: "Category Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "delete category error",error });
    }
}
module.exports = {
    CreateCategory,
    GetAllCategory,
    UpdateCategory,
    DeleteCategory
}
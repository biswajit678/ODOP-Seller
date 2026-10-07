import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    title:{
        type:String
    },
    image:String
},{timestamps:true});

const Category = mongoose.model("Category", categorySchema);
export default Category;
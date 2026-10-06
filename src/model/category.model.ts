import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String
    },
    collection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection",
        required:true
    },
    image:String
},{timestamps:true});

const Category = mongoose.model("Category", categorySchema);
export default Category;
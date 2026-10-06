import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    image:String,
    description:String
},{timestamps:true});

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
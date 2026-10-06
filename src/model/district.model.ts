import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String
    },
    image:String,
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const District = mongoose.model("District", districtSchema);
export default District;
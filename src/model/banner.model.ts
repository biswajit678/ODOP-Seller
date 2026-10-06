import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["hero", "category", "offer"],
        default:"hero"
    },
    buttonLink:{
        type:String,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
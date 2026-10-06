import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    district:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"District",
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    collection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection",
        required:true
    },
    description:String,
    title:String,
    images: [String],
    backImage:String,
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    originalPrice:{
        type:Number,   
        required:true
    },
    stock:{
        type:Number,
        default:1
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);
export default Product;
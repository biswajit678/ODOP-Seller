import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    isDeactivated:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const AuthUser = mongoose.model("AuthUser", userAuthSchema);
export default AuthUser;
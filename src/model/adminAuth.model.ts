import mongoose from "mongoose";

const adminAuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
},{
    timestamps:true
});

const AuthAdmin = mongoose.model("AuthAdmin", adminAuthSchema);
export default AuthAdmin;
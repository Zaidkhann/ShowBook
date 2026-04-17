import mongoose , {Schema} from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import app from "../app.js"
const userSchema = new Schema({
    username:{
        type:String,
        required: [true,"username is required"],
        lowercase: true,
        trim: true
    },
    email:{
        type:String,
        required: [true,"email is required"],
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email is not valid"]
    },
    password:{
        type:String,
        required:[true,"Password is must required"],
        trim: true,
        minlength: [5,"Password must have 5 characters"]
    },
    location:{
        type:String,
        required:true,
        default:"Bhopal",
        trim:true,

    },
    role:{
        type: String,
        enum:["user","admin"],
        default: "user",
        required:true
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password,12)
    next()
});

userSchema.methods.generateJWT = async function() {
    return await jwt.sign({'userId': this._id},process.env.JWT_SECRET_KEY,{'expiresIn':'1d'})
};
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
};
const User = mongoose.model("User",userSchema)

export default User
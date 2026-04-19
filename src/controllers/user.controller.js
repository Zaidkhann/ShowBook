import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const updateUsername = async (req,res)=>{
    try{
        const {username} = req.body
        if(!username){
            return res.status(400).json({
                message: "Username is required"
            });
        }
        const user = await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.username = username
        await user.save()
        return res.status(200).json({
            message: "Username updated successfully",
            user: {
                id: user._id,
                username: user.username
            }
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });

    }
}

export const updateEmail = async (req,res)=>{
    try{
        const {email} = req.body
        if(!email){
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const user = await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.email = email
        await user.save()
        return res.status(200).json({
            message: "Email updated successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });

    }
}

export const updatePassword = async (req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body
        if(!oldPassword||!newPassword){
            return res.status(400).json({
                message: "Password is required"
            });
        }
        const user = await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect"
            });
        }
        
        user.password = newPassword
        await user.save()
        return res.status(200).json({
            message: "Password updated successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });

    }
}

export const updateLocation = async (req,res)=>{
    try{
        const {location} = req.body
        if(!location){
            return res.status(400).json({
                message: "location is required"
            });
        }
        const user = await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.location = location
        await user.save()
        return res.status(200).json({
            message: "location updated successfully",
            user: {
                username: user.username,
                email: user.email,
                location:user.location
            }
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });

    }
}
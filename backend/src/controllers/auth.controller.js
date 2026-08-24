import mongoose from "mongoose";
import User from "../models/user.model.js";
import cookie from "cookie-parser"

export const registerUser = async (req,res)=>{
    try{
        const {username,password,email,location} = req.body
        if (!username || !password || !email) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json(
                {message:`User exist already with this email ${email}`}
            )
        }
        const user = await User.create(
            {
                username,
                email,
                password,
                location
            }
        )
        const token = await user.generateJWT()
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                username: user.username,
                email: user.email,
                location:user.location,
                role:user.role

            }
        })
}

catch(err){
    res.status(500).json({
        message:"Internal error found",
        error:err.message
    })
}
}


export const loginUser = async (req,res)=>{
    const {email,password} = req.body
    if (!password || !email) {
                return res.status(400).json({
                    message: "All fields are required"
    })
}
    try{
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            "message":"Invalid email or password"
        })
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({
                message: "Invalid email or password"
            });
    }
    const token = await user.generateJWT();
    res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

    res.status(201).json({
        user:{
                id:user._id,
                username: user.username,
                email: user.email,
                location:user.location,
                role:user.role
            },
        message:"Login successfully",

    })

    }
    catch(err){
        res.status(404).json({
            message:'User not found with this email',
            error:err.message
        })
    }

}

export const logoutUser = async (req,res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: false
})
    return res.status(200).json({
        message: "Logged out successfully"
    });

}


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        location: user.location,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
import JWT from "jsonwebtoken"
import User from "../models/user.model.js"


const authMiddleware = async function(req, res, next) {
    try{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1])
    if(!token){
        return res.status(401).json({
            "message":"User is not authenticated. Please log In."
        })
    }
    const decodedToken = await JWT.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decodedToken
    next()
    }
    catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
    
} 

export default authMiddleware

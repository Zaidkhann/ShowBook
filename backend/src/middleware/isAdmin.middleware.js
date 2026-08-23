import User from "../models/user.model.js"
const isAdmin = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.userId)
        if (!user||user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Admins only"
            });
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
}
export default isAdmin
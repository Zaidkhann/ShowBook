import Show  from "../models/show.model.js";

export const postShow = async(req,res) => {
    try{
        const {movie,theater,showAt} = req.body
        if(!movie||!theater||!showAt){
            res.status(409).json({
                "message" : "All fields are required"
            })
            return
        }
        const show = await Show.create({
            movie,
            theater,
            showAt
        })
        return res.status(201).json({
            "message" : "Show field created successfully",
            show
        })
    }
    catch(err){
        return res.status(500).json({
            "message" : err.message
        })
    }
}
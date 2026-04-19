import Show  from "../models/show.model.js";

export const postShow = async(req,res) => {
    try{
        const {movie,theaters,date,time,price} = req.body
        if(!movie||!theaters||!date||!time||!price){
            res.status(409).json({
                "message" : "All fields are required"
            })
        }
        const show = await Show.create({
            movie,
            theaters,
            date,
            time,
            price
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
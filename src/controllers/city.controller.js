import City  from "../models/city.model.js";

export const postCity = async(req,res)=>{
    try{
        const {cityName,theaters} = req.body
        if(!cityName||!theaters){
            return res.status(400).json({
            "message":"All Fields are must required"
        })
        }
        const city = await City.create({
            cityName,
            theaters
        })
        res.status(201).json({
            "message" : "city field is created successfully",
            city
        })
    }
    catch(err){
        res.status(500).json({
            "message" : "Failed to create city field"
        })
    }
}

export const getAllCity = async(req,res)=>{
    try{
        const cities = await City.find({})
        res.status(200).json({
            "Found": `${cities.length} founded!`,
            cities:cities
        })
    }
    catch(err){
        res.status(404).json({"message":`No Cities found ${err.message}`})
    }

}
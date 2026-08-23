import City  from "../models/city.model.js";
import Theater from "../models/theater.model.js";

export const postCity = async(req,res)=>{
    try{
        const {cityName} = req.body
        if(!cityName){
            return res.status(400).json({
            "message":"cityName is required"
        })
        }
        
        const existingTheaters = await Theater.find({ location: cityName.toLowerCase() });
        const theaterIds = existingTheaters.map(t => t._id);

        const city = await City.create({
            cityName,
            theaters: theaterIds
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
        const cities = await City.find({}).populate("theaters")
        res.status(200).json({
            "Found": `${cities.length} founded!`,
            cities:cities
        })
    }
    catch(err){
        res.status(404).json({"message":`No Cities found ${err.message}`})
    }

}
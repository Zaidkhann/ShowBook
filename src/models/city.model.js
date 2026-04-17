import mongoose,{Schema} from "mongoose";

const citySchema = new Schema({
    cityName:{
        type:String,
        lowercase:true,
        required:true
    },
    theater:{
        type:mongoose.Types.ObjectId,
        ref:"Theater"
    }
},{timestamps:true})

const City = mongoose.model("City",citySchema)

export default City
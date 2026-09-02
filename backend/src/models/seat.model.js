import mongoose,{Schema} from "mongoose"

const seatSchema = new Schema({
    seat:[{
        type:String,
        required:true,
    }],
    theatre:{
        type: mongoose.Types.ObjectId,
        ref:"Theater",
        required: true
      
    }
    
})

const Seat = mongoose.model("Seat",seatSchema)

export default Seat
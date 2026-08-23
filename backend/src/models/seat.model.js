import mongoose,{Schema} from "mongoose"

const seatSchema = new Schema({
    seatNumber:{
        type:Number,
        required:true,
        default:1
    },
    seatType:{
        type: String,
        enum: ["Normal","Premium","Vip"],
        default: "Normal"
    },
    status:{
        type: String,
        enum:["reserved","available"],
        default:"available"
    }
    
})

const Seat = mongoose.model("Seat",seatSchema)

export default Seat
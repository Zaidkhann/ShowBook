import mongoose,{Schema} from "mongoose"

const bookingSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    show: {
    type: mongoose.Types.ObjectId,
    ref: "Show"
},
    
    seat:[{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    }]
},{
    timestamps:true
})

const Booking = mongoose.model("Booking",bookingSchema)

export default Booking
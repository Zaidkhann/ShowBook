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
    date:{
        type:String
    },
    time:{
        type:String
    },
    price:{
        type:Number,
        required:true,
        default:null
    },
    seat:{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    }
},{
    timestamps:true
})

const Booking = mongoose.model("Booking",bookingSchema)

export default Booking
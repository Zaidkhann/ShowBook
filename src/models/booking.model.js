import mongoose,{Schema} from "mongoose"

const bookingSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    },
    theater:{
        type:mongoose.Types.ObjectId,
        ref:"Theater"
    },
    OnDate:{
        type:String
    },
    time:{
        type:String
    },
    price:{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    },
    seat:{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    }
},{
    timestamps:true
})
import mongoose,{Schema} from "mongoose";

const theaterSchema = new Schema({
    theaterName : {
        type: String,
        required:true,
        trim:true,
        required:true,
        lowercase:true
    },
    location:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    movie:[{
        type: mongoose.Types.ObjectId,
        ref:"Movie"

    }],
    seats:[{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    }]
},{
    timestamps:true
})

const Theater = mongoose.model("Theater",theaterSchema)
export default Theater
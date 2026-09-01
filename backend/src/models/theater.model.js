import mongoose,{Schema} from "mongoose";

const theaterSchema = new Schema({
    theatreName : {
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
    movies:[{
        type: mongoose.Types.ObjectId,
        ref:"Movie"

    }],
    seats:[{
        type:mongoose.Types.ObjectId,
        ref:"Seat"
    }],
    rows:{
        type:Number,
        required:true
    },
    columns:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Theater = mongoose.model("Theater",theaterSchema)
export default Theater
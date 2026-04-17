import mongoose,{Schema} from "mongoose";

const movieSchema = new Schema({
    movieName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    genre:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
        default:"Hindi"
    },
    duration:{
        type:String,
    },
    rating:{
        type:Number,
        default:3
    }
},{
    timestamps:true
})

const Movie = mongoose.model("Movie",movieSchema)

export default Movie
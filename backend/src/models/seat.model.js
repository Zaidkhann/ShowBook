import mongoose,{Schema} from "mongoose"

const seatSchema = new Schema({
    seat: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    theater:{
        type: mongoose.Types.ObjectId,
        ref:"Theater",
        required: true
      
    }
    
})
seatSchema.index(
    { theater: 1, seat: 1 },
    { unique: true }
);

const Seat = mongoose.model("Seat",seatSchema)

export default Seat
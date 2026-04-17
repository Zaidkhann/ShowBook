import mongoose, { Schema } from "mongoose";

const showSchema = new Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    theater: {
        type: mongoose.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Show = mongoose.model("Show", showSchema);

export default Show;
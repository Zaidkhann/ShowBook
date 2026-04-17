import mongoose,{Schema} from "mongoose"

const seatSchema = new Schema({
    seatNo:{
        type:Number,
        required:true,
        default:1
    },
    seatType:{
        enum: ["Normal","Premium","Vip"],
        default: "Normal"
    },
    status:{
        enum:["reserved","available"],
        default:"available"
    }
    
})
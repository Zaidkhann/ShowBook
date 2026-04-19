import Seat from "../models/seat.model.js";


export const postSeat = async(req,res) =>{
    try{
        const {seatNumber,seatType,status} = req.body
        if(!seatNumber||!seatType||!status){
            res.status(400).json({
                "message" :"All fields are required "
                })
        }
        const seat = await Seat.create({
            seatNumber,
            seatType,
            status
        })
        return res.status(201).json({
            "message" :"Succesfully Seat is created ",
            "seat":{"seatId":seat._id,
                "seatNumber": seat.seatNumber,
                "status": seat.status
            }
            })
    }catch(err){
        return res.status(500).json({
            "message" : err.message

            })
    }
}
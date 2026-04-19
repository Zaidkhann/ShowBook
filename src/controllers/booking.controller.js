import Booking from "../models/booking.model.js";
import Seat from "../models/seat.model.js";

export const postBooking = async(req,res) =>{
    try{
        const user = req.user.userId
        const {show,seat} = req.body
        if(!user||!show||!seat){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const seatDoc = await Seat.findOneAndUpdate(
            {_id: seat,status:"available"},
            {status:"reserved"},
            { new: true }
        )
        if (!seatDoc) {
            return res.status(400).json({
                message: "Seat already reserved 🙁"
            });
        }

        const booking = await Booking.create({
            user,
            show,
            seat
        });

        return res.status(201).json({
            message: "Booking successfully",
            seatInfo: {
                seatType: seatDoc.seatType,
                seatNumber: seatDoc.seatNumber
            }
        });
    }
    catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
}
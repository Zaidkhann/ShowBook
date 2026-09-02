import Seat from "../models/seat.model.js";


export const postSeat = async(req,res) =>{
    try{
        const {seats,theatre} = req.body
        const seatData = seats.map((seat) => ({
            theatre,
            seat
        }));
        const createdSeats = await Seat.insertMany(seatData);
        res.status(201).json({
            message: "Seats created successfully",
            seats: createdSeats
        });
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getSeat = async(req,res) =>{
    try{
        const {theaterId} = req.params;
        const seats = await Seat.find({
            theatre: theaterId
        });
        res.status(200).json(seats);

    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
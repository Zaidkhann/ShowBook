import Seat from "../models/seat.model.js";


export const postSeat = async(req,res) =>{
    try{
        const {selectedSeat,theater} = req.body
        const seatData = selectedSeat.map((seat) => ({
            theater,
            seat: seat.seat,
            price: seat.price
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
            theater: theaterId
        });
        res.status(200).json(seats);

    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
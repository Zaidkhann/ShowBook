import Theater from "../models/theater.model.js"
import User from "../models/user.model.js"

export const postTheater = async (req, res) => {
    try {
        const { theaterName, movies, seats, location } = req.body
        if (!theaterName || !movies || !seats || !location) {
            return res.status(400).json({
                "message": "All fields are required "
            })
        }
        const theater = await Theater.create({
            theaterName,
            movies,
            seats,
            location
        })
        res.status(201).json({
            "message": "Succesfully field created theater",
            theater
        })

    }
    catch (err) {
        return res.status(500).json({
            "message": err.message

        })
    }
}

export const getTheaterByLocation = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const theaters = await Theater.aggregate([
            {
                $match: {
                    location: { $regex: user.location, $options: "i" }
                }
            }
        ]);
        if (theaters.length === 0) {
            return res.status(404).json({
                "message": "No theathers found in selected region"
            })
        }
        return res.status(200).json({
            "Found": `${theaters.length} theaters found in ${req.user.location}`,
            message: "Theaters fetched successfully",
            theaters
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


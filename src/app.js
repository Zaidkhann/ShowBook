import express from "express"
import authRoute from "./routes/auth.route.js"
import movieRoute from "./routes/movie.route.js"
import theaterRoute from "./routes/theater.route.js"
import seatRoute from "./routes/seat.route.js"
import cityRoute from "./routes/city.route.js"
import showRoute from "./routes/show.route.js"
import bookingRoute from "./routes/booking.route.js"
import updateProfileRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/movie",movieRoute)
app.use("/api/theater",theaterRoute)
app.use("/api/seat",seatRoute)
app.use("/api/city",cityRoute)
app.use("/api/show",showRoute)
app.use("/api/booking",bookingRoute)
app.use("/api/user",updateProfileRoute)

export default app
import express from "express"
import authRoute from "./routes/auth.route.js"
import movieRoute from "./routes/movie.route.js"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/movie",movieRoute)
export default app
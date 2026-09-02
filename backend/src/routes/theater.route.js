import express from "express"
import { postTheater,getTheaterByLocation,getAllTheaters,getTheaterById } from "../controllers/theater.contoller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-theatre', authMiddleware, postTheater)
router.get('/get-theaters',authMiddleware,getTheaterByLocation)
router.get('/get-Alltheaters',authMiddleware,getAllTheaters)
router.get('/get-theaterById/:theaterId',authMiddleware,getTheaterById)


export default router
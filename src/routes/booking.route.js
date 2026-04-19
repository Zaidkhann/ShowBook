import express from "express"
import {postBooking} from "../controllers/booking.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/book-seat',authMiddleware,isAdminMiddleware,postBooking)

export default router
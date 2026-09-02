import express from "express"
import {postSeat} from "../controllers/seat.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-seat',authMiddleware,postSeat)
router.get('/get-seat/:theaterId',authMiddleware,postSeat)

export default router
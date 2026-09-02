import express from "express"
import {postSeat,getSeat} from "../controllers/seat.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-seat',postSeat)
router.get('/get-seat/:theaterId',getSeat)

export default router
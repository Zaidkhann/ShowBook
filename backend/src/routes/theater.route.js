import express from "express"
import { postTheater,getTheaterByLocation } from "../controllers/theater.contoller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-theater', authMiddleware,isAdminMiddleware, postTheater)
router.get('/getTheaters',authMiddleware,getTheaterByLocation)

export default router
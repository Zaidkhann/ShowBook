import express from "express"
import {postShow,getShowByLocation} from "../controllers/show.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-show',authMiddleware,postShow)
router.get('/getShowsByMovie/:movieId',authMiddleware,getShowByLocation)

export default router
import express from "express"
import {postShow} from "../controllers/show.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-show',authMiddleware,isAdminMiddleware,postShow)

export default router
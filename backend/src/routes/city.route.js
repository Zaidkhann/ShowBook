import express from "express"
import {postCity,getAllCity} from "../controllers/city.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"


const router = express.Router()

router.post('/post-city',authMiddleware,isAdminMiddleware,postCity)
router.get('/get-cities',getAllCity)

export default router
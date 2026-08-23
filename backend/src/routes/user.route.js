import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { updateUsername,updateEmail,updatePassword,updateLocation } from "../controllers/user.controller.js"


const router = express.Router()

router.patch('/update-username',authMiddleware,updateUsername)
router.patch('/update-email',authMiddleware,updateEmail)
router.patch('/update-password',authMiddleware,updatePassword)
router.patch('/update-location',authMiddleware,updateLocation)


export default router
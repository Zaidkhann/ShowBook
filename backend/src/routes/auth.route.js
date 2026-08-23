import app from "../app.js"
import express from "express"
import {googleCallback } from "../controllers/google-auth.controller.js"

import { registerUser, loginUser, logoutUser,getCurrentUser} from "../controllers/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"


const router = express.Router()


router.post('/register',registerUser)

router.post('/login',loginUser)

router.post('/logout',logoutUser)

router.get('/me',authMiddleware,getCurrentUser)

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
    }),
    googleCallback
);

export default router
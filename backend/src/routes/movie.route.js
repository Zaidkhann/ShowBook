import express from "express"
import {postMovie,getAllMovie} from "../controllers/movie.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"
const router = express.Router()

router.post('/post-movie',authMiddleware,isAdminMiddleware,postMovie)

router.get('/get-movie',authMiddleware,getAllMovie)
export default router
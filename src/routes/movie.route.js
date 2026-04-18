import express from "express"
import {postMovie,getAllMovie} from "../controllers/movie.controller.js"
const router = express.Router()

router.post('/post-movie',postMovie)

router.get('/get-movie',getAllMovie)
export default router
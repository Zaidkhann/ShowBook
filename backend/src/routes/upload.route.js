import express from "express";
import upload from "../middleware/multerUpload.middleware.js";
import { uploadMovieCover } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/movie-cover",
  upload.single("coverImage"),
  uploadMovieCover
);

export default router;
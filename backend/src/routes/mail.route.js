import express from "express";
import { sendBookingMail } from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/booking-confirmation", sendBookingMail);

export default router;
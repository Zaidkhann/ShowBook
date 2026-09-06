import express from "express";
import { sendBookingMail, sendRegisteredMail } from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/booking-confirmation", sendBookingMail);
router.post("/registeration-confirmation", sendRegisteredMail);

export default router;
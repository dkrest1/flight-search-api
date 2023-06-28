import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightController, comfirmFlightController, bookFlightController, getBookingsController } from "./flight.controller.js"

const router = new express.Router();

router.post("/search", searchFlightController);
router.post("/comfirm/:id", auth, comfirmFlightController);
router.post("/book/:id", auth, bookFlightController);
router.get("/bookings", auth, getBookingsController);

export default router;

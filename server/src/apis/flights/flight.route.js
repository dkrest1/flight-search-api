import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightController, comfirmFlightController, bookFlightController, getBookingsController } from "./flight.controller.js"
import { flightRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = new express.Router();

router.post("/search", flightRateLimiter, searchFlightController);
router.post("/comfirm/:id", auth, flightRateLimiter, comfirmFlightController);
router.post("/book/:id", auth, flightRateLimiter, bookFlightController);
router.get("/bookings", auth, getBookingsController);

export default router;

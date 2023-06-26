import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightController, comfirmFlightController, bookFlightController } from "./flight.controller.js"

const router = new express.Router();

router.post("/search", searchFlightController);
router.post("/comfirm/:id", comfirmFlightController);
router.post("/book/:id", bookFlightController);
export default router

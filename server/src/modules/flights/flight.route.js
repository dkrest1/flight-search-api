import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightInfo, filterFlightResult } from "./flight.controller.js"

const router = new express.Router();

router.post("/search", searchFlightInfo);
router.get("/search", filterFlightResult)

export default router

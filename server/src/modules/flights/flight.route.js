import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightInfo, filterAndSortFlightResult } from "./flight.controller.js"

const router = new express.Router();

router.post("/", searchFlightInfo);
router.get("/search", filterAndSortFlightResult)

export default router

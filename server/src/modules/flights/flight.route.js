import express from "express"
import auth from "../middleware/auth.middleware.js";
import { searchFlightInfo } from "./flight.controller.js"

const router = new express.Router();

router.post("/search", searchFlightInfo);

export default router

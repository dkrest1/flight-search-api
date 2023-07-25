import express from "express"
import auth from "../middleware/auth.middleware.js";
import {
    searchFlightController,
    comfirmFlightController,
    bookFlightController,
    getBookingsController
} from "./flight.controller.js"
import { flightRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = new express.Router();

// ================================================================================
//  Swagger Documentation for the Flight Resorce
// =================================================================================


// DTO for search flight
/**
 * @swagger
 * components:
 *   schemas:
 *     FlightSearchDTO:
 *       type: object
 *       required:
 *         - origin
 *         - destination 
 *         - departure_date
 *         - adults
 *       properties:
 *         origin:
 *           type: string
 *           description: The flight airport origin
 *         destination:
 *           type: string
 *           description: The flight airport destination
 *         departure_date:
 *           type: string
 *           format: date
 *           description: The departure date
 *         adults:
 *            type: string
 *            description: The passenger number must be equal 1
 */

// request and response for create user 
/**
 * @swagger
 * tags:
 *   name: Flight 
 *   description: The Flight resource endpoint
 * /flight/search:
 *   post:
 *     summary: Search for a flight offers
 *     tags: [Flight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightSearchDTO'
 *     responses:
 *       201:
 *         description: return flight data.
 *       400:
 *          description: data error.
 *       429:
 *          description: too many request, please try again later.  
 *       500:
 *         description: server error, please try again later.
 *
 */
router.post("/search", flightRateLimiter, searchFlightController);

// DTO for Flight  comfirmation
/**
 * @swagger
 * components:
 *   schemas:
 *     FlightComfirmationDTO:
 *       type: object
 *       required:
 *         - origin
 *         - destination 
 *         - departure_date
 *         - adults
 *       properties:
 *         origin:
 *           type: string
 *           description: The flight airport origin
 *         destination:
 *           type: string
 *           description: The flight airport destination
 *         departure_date:
 *           type: string
 *           format: date
 *           description: The departure date
 *         adults:
 *            type: string
 *            description: The passenger number must be equal to 1
 */

// request and response for create user 
/**
 * @swagger
 * tags:
 *   name: Flight 
 *   description: The Flight resource endpoint
 * /flight/comfirm/{flightOfferId}:
 *   post:
 *     summary: comfirm flight offer before booking
 *     parameters: 
 *       - name: flightOfferId
 *         in: path
 *         description: The flight offer ID that is about to be comfirmed
 *         required: true     
 *         schema:
 *           type: integer
 *     tags: [Flight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightComfirmationDTO'
 *     responses:
 *       201:
 *         description: return comfirm flight data.
 *       400:
 *          description: data error.
 *       429:
 *          description: too many request, please try again later.  
 *       500:
 *         description: server error, please try again later.
 *
 */
router.post("/comfirm/:id", auth, flightRateLimiter, comfirmFlightController);


// DTO for Flight  comfirmation
/**
 * @swagger
 * components:
 *   schemas:
 *     FlightBookingDTO:
 *       type: object
 *       required:
 *         - origin
 *         - destination 
 *         - departure_date
 *         - adults
 *         - travelerId
 *         - dateOfBirth
 *         - firstName
 *         - lastName
 *         - gender
 *         - email
 *         - countryCode
 *         - phone
 *       properties:
 *         origin:
 *           type: string
 *           description: The flight airport origin
 *         destination:
 *           type: string
 *           description: The flight airport destination
 *         departure_date:
 *           type: string
 *           format: date
 *           description: The departure date
 *         adults:
 *           type: string
 *           description: The passenger number must be equal to 1
 *         travelerId:
 *           type: number
 *           description: The passenger traveler ID number which must be equal to 1 
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The passenger date of birth
 *         firstName:
 *           type: string
 *           description: The passenger firstname
 *         lastName:
 *           type: string
 *           description: The passenger lastname
 *         gender:
 *           type: string
 *           description: The passenger sex either MALE or FEMALE
 *         email:
 *           type: string
 *           description: The passenger email
 *         countryCode:
 *           type: string
 *           description: The passenger country code e.g +234
 *         phone:
 *           type: string
 *           description: The passenger phone number 8111111111
 */

// request and response for create user 
/**
 * @swagger
 * tags:
 *   name: Flight 
 *   description: The Flight resource endpoint
 * /flight/book/{flightOfferId}:
 *   post:
 *     summary: comfirm flight offer before booking
 *     parameters: 
 *       - name: flightOfferId
 *         in: path
 *         description: The flight offer ID that is about to be Booked
 *         required: true     
 *         schema:
 *           type: integer
 *     tags: [Flight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightBookingDTO'
 *     responses:
 *       201:
 *         description: return flight booking data.
 *       400:
 *          description: data error.
 *       429:
 *          description: too many request, please try again later.  
 *       500:
 *         description: server error, please try again later.
 *
 */
router.post("/book/:id", auth, bookFlightController);

// Book Model or User Entity
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingEntity:
 *       type: object
 *       required:
 *         - fullname
 *         - email 
 *         - bookId
 *         - queueOfficeId
 *         - reference
 *       properties:
 *         fullname:
 *           type: string
 *           description: The fullname of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         bookId:
 *           type: string
 *           description: The flight Booking ID
 *         queueOfficeId:
 *           type: string
 *           description: The flight queue office ID
 *         reference:
 *           type: string
 *           description: The flight booking reference
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the flight was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the flight booking  was updated
 */


/// request response to get all your bookings
/**
 * @swagger
 * /flight/bookings:
 *   get:
 *     summary: get users profile
 *     tags: [Flight]
 *     responses:
 *       200:
 *         description: get all your flight booking detail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingEntity'
 *       401:
 *          description: Unauthorized.
 *       500:
 *         description: Server error, please try again later.
 *
 */
router.get("/bookings", auth, getBookingsController);

export default router;

import { flightSearcService, flightComfirmationService, flightBookingService } from "./flight.service.js";
import { logger } from "../../config/logger.config.js";
import { pagination } from "../utils/helper.utils.js";
import Joi from "joi";
import axios from "axios";


//@description: search flight info 
//@route : /flight/search
//@access: public
export const searchFlightController = async (req, res) => {
    //get request body
    const { origin, destination, departure_date, adults } = req.body
    //parameter validation
    const schema = Joi.object().keys({
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        departure_date: Joi.string().required(),
        adults: Joi.string().required()
    });

    // validate flight input
    const { error } = schema.validate({ origin, destination, departure_date, adults });

    if (error) {
        return res
            .status(400)
            .json({ sucess: false, message: error.message });
    }

    try {
        const result = await flightSearcService(origin, destination, departure_date, adults);

        return res.status(201).json({ success: true, data: result });

    } catch (err) {
        logger.error(err)
        console.log(err)
        return res.status(400).json({
            success: false,
            status: err.code,
            message: err.description,

        });
    }
}

export const comfirmFlightController = async (req, res) => {
    const flightId = req.params.id
    const { origin, destination, departure_date, adults } = req.body
    try {
        const result = await flightComfirmationService(origin, destination, departure_date, adults, flightId);
        return res.status(200).json({ success: true, data: result })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            status: err.code,
            message: err.description,

        });
    }

}

export const bookFlightController = async (req, res) => {
    const id = req.params.id;
    const { origin, destination, departure_date, adults, travelerId, dateOfBirth, firstName, lastName, gender, email, countryCode, phone } = req.body

    const schema = Joi.object().keys({
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        departure_date: Joi.string().required(),
        adults: Joi.string().required(),
        travelerId: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        departure_date: Joi.string().required(),
        adults: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().required(),
        countryCode: Joi.string().required(),
        phone: Joi.string().required(),
    });

    // validate flight input
    const { error } = schema.validate({ origin, destination, departure_date, adults, travelerId, dateOfBirth, origin, destination, departure_date, adults, firstName, lastName, gender, email, countryCode, phone });

    if (error) {
        return res
            .status(400)
            .json({ sucess: false, message: error.message });
    }

    const travellers = []
    const contact = {
        "id": travelerId,
        "dateOfBirth": dateOfBirth,
        "name": {
            "firstName": firstName,
            "lastName": lastName
        },
        gender,
        "contact": {
            "emailAddress": email,
            "phones": [{
                "deviceType": "MOBILE",
                "countryCallingCode": countryCode,
                "number": phone
            }]
        },
    }

    travellers.push(contact)

    try {
        const result = await flightBookingService(origin, destination, departure_date, adults, id, travellers)
        return res.status(200).json({ data: result })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            status: err.code,
            message: err.description,

        });
    }

}



/**
 * ===================================================================================================================================
 *  Code Commented out cause this can be implemented from the frontend
 * ===================================================================================================================================
 */
// //@description: filter flight info 
// //@route : /flight/search?filterBy=airline||arrival||departure||duration||price
// //@route : /flight/search?soryBy=departure||duration||price
// //@access: public
// export const filterAndSortFlightResult = async (req, res) => {
//     //get request body
//     const { origin, destination, departure_date, return_date, passenger_number } = req.body
//     //to manually set pagination
//     const { startIndex, lastIndex } = pagination(req.query.page, req.query.limit);

//     //get queries
//     const queries = Object.keys(req.query)
//     //validate queries
//     const validQueries = ["filterBy", "sortBy", "page", "limit", "orderBy"];
//     const validatedQueries = queries.every(query => validQueries.includes(query))

//     if (!validatedQueries) {
//         return res.status(400).json({ success: false, message: "Invalid query property" })
//     }

//     try {
//         const flightResult = await flightInfoService(origin, destination, departure_date, return_date, passenger_number);
//         let filteredResult = flightResult;

//         // Define mapping for filter properties
//         const filterMapping = {
//             airline: "airline",
//             arrival: "arrival",
//             price: "price",
//             duration: "duration",
//             departure: "departure"
//         };

//         const filterBy = req.query.filterBy;
//         const sortBy = req.query.sortBy;
//         const orderBy = req.query.orderBy;
//         // Apply filtering if filterBy parameter is provided
//         if (filterBy && filterMapping.hasOwnProperty(filterBy)) {
//             const filterProperty = filterMapping[filterBy];
//             filteredResult = filteredResult.map(flight => ({
//                 id: flight.id,
//                 [filterProperty]: flight[filterProperty]
//             }));
//         }

//         // Apply sorting if sortBy and orderBy parameters are provided
//         if (sortBy) {
//             // Validate sorting
//             if (sortBy !== "price" && sortBy !== "duration" && sortBy !== "departure") {
//                 return res.status(400).json({ success: false, message: "Invalid sorting" });
//             }

//             filteredResult.sort((a, b) => {
//                 const valueA = a[sortBy];
//                 const valueB = b[sortBy];
//                 let comparison = 0;

//                 if (typeof valueA === "number" && typeof valueB === "number") {
//                     comparison = valueA - valueB;
//                 } else {
//                     // Convert both values to strings for case-insensitive comparison
//                     const stringA = String(valueA).toLowerCase();
//                     const stringB = String(valueB).toLowerCase();
//                     if (stringA < stringB) {
//                         comparison = -1;
//                     } else if (stringA > stringB) {
//                         comparison = 1;
//                     }
//                 }

//                 return orderBy === "desc" ? -comparison : comparison;
//             });
//         }

//         // Return the filtered and sorted result
//         return res.status(200).json({ success: true, data: filteredResult });
//     } catch (err) {
//         logger.error(err);
//         return res.status(500).json({
//             success: false,
//             status: err.code,
//             message: err.description,
//         });
//     }
// }
import { flightInfoService } from "./flight.service.js";
import { logger } from "../../config/logger.config.js";
import { pagination } from "../utils/helper.utils.js";


//@description: search flight info 
//@route : /flight/search
//@access: public
export const searchFlightInfo = async (req, res) => {
    //get request body
    const { origin, destination, departure_date, return_date, passenger_number } = req.body
    //to manually set pagination
    const { startIndex, lastIndex } = pagination(req.query.page, req.query.limit);
    try {
        const result = await flightInfoService(origin, destination, departure_date, return_date, passenger_number);
        // Get the paginated result
        const paginatedResult = result.slice(startIndex, lastIndex);
        return res.status(201).json({ success: true, data: paginatedResult });
    } catch (err) {
        logger.error(err)
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
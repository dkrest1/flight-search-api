import { flightInfoService } from "./flight.service.js";
import { logger } from "../../config/logger.config.js";




//@description: search flight info 
//@route : /flight/search
//@access: public
export const searchFlightInfo = async (req, res) => {
    //get request body
    const { origin, destination, depature_date, return_date, passenger_number } = req.body
    try {
        const result = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
        return res.status(201).json({ success: true, data: result });
    } catch (err) {
        logger.error(err)
        return res.status(400).json({
            success: false,
            status: err.code,
            message: err.description,

        });
    }

}

//@description: filter flight info 
//@route : /flight/search?filterBy=airline||arrival||departure||duration||price
//@route : /flight/search?soryBy=departure||duration||price&orderBy=asc||desc
//@access: public
export const filterAndSortFlightResult = async (req, res) => {
    //get request body
    const { origin, destination, depature_date, return_date, passenger_number } = req.body
    //get query
    const queryKeys = Object.keys(req.query)
    // get query values
    const queryValues = Object.values(req.query);

    //validate query keys
    const validQueriesKeys = ["filterBy", "sortBy", "orderBy"];
    const validatedQueryKeys = queryKeys.every(value => validQueriesKeys.includes(value))

    //validate query values
    const validQueriesValues = ["airline", "arrival", "departure", "duration", "price", "asc", "desc"];
    const validatedQueryValues = queryValues.every(value => validQueriesValues.includes(value))

    if (!validatedQueryKeys || !validatedQueryValues) {
        return res.status(400).json({ success: false, message: "invalid search" })
    }



    try {
        const flightResult = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
        //filter rsult
        if (req.query === "filterBy" && req.query === "orderBy") {
            return res.status(200).json({ message: "great" })
        }


        //sort flight 


    } catch (error) {
        logger.error(error)
        return res.status(500).json({ success: false, message: "something went wrong, try again later" })
    }
}

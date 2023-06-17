import { flightInfoService } from "./flight.service.js";
import { logger } from "../../config/logger.config.js";
import { validateFlightInput } from "./validators/flight.validator.js";




//@description: search flight info 
//@route : /flight/search
//@access: public
export const searchFlightInfo = async (req, res) => {
    const { origin, destination, depature_date, return_date, passenger_number } = await validateFlightInput(req.body);
    try {
        const result = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
        return res.status(201).json({ success: true, data: result });
    } catch (err) {
        logger.error(err)
        return res.status(400).json({
            success: failure,
            status: err.code,
            message: err.description,

        });
    }

}

//@description: filter flight info 
//@route : /flight/search?filter=query
//@access: public
export const filterFlightResult = async (req, res) => {
    // get query
    const query = Object.values(req.query)[0];
    const validQueries = ["airline", "departure", "arrival", "duration", "price"];
    const validatedQuery = validQueries.includes(query)
    if (!validatedQuery) {
        return res.status(400).json({ success: false, message: "invalid query" })
    }
    const { origin, destination, depature_date, return_date, passenger_number } = await validateFlightInput(req.body);
    try {
        const flightResult = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
        // filter flight result  by query
        const filteredResult = await flightResult.map((result) => {
            return {
                id: result.id,
                [query]: result[query]
            }
        })

        return res.status(200).json({ success: true, data: filteredResult })
    } catch (error) {
        logger.error(error)
        return res.status(500).json({ success: false, message: "something went wrong, try again later" })
    }
}

//@description: sort flight info 
//@route : /flight/search?sort=query&asc
//@access: public
export const sortFlightInfo = async () => {
    return
}

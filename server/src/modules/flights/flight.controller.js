import Joi from "joi"
import {
    passwordToHash,
    compareBcryptPassword,
    generateTokenFromPayload
} from "../utils/helper.utils.js";
import { flightInfoService } from "./flight.service.js";


//@description: search flight info 
//@route : /flight/search
//@access: public
export const searchFlightInfo = async (req, res) => {
    //search input
    const { origin, destination, depature_date, return_date, passenger_number } = req.body;
    //validation of input
    const schema = Joi.object().keys({
        origin: Joi.string().length(3).required(),
        destination: Joi.string().length(3).required(),
        depature_date: Joi.string().required(),
        return_date: Joi.string(),
        depature_date: Joi.string().required(),
        passenger_number: Joi.string().required()
    });

    const { error } = schema.validate({ origin, destination, depature_date, return_date, passenger_number });
    if (error) {
        return res
            .status(400)
            .json({ message: error.message });
    }

    try {
        const result = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
        const data = {
            id: result.data[0].id,
            oneWay: result.data[0].oneWay,
            lastTicketingDate: result.data[0].lastTicketingDate,
            numberOfBookableSeats: result.data[0].numberOfBookableSeats,
            itineraries: result.data[0].itineraries,
            duration: result.data[0].duration,
            segments: result.data[0].segments,
            price: result.data[0].price
        }
        return res.status(200).json(result.data);
    } catch (err) {
        return res.status(400).json({
            error: err.description,
            code: err.code
        });
    }

}

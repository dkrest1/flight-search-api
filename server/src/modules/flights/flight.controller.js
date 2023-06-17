import Joi from "joi"
import {
    passwordToHash,
    compareBcryptPassword,
    generateTokenFromPayload
} from "../utils/helper.utils.js";
import { flightInfoService } from "./flight.service.js";
import { logger } from "../../config/logger.config.js";


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
        passenger_number: Joi.string().required()
    });

    const { error } = schema.validate({ origin, destination, depature_date, return_date, passenger_number });
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }

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

export const filterFlightResult = async (req, res) => {
    const { origin, destination, depature_date, return_date, passenger_number } = req.body
    //get query
    const query = Object.values(req.query)[0]

    //validation of input
    const schema = Joi.object().keys({
        origin: Joi.string().length(3).required(),
        destination: Joi.string().length(3).required(),
        depature_date: Joi.string().required(),
        return_date: Joi.string(),
        passenger_number: Joi.string().required()
    });

    const { error } = schema.validate({ origin, destination, depature_date, return_date, passenger_number });
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }
    const flightResult = await flightInfoService(origin, destination, depature_date, return_date, passenger_number);
    //filter flight result  by query
    const filteredResult = await flightResult.map((result) => {

        return {
            id: result.id,
            [query]: result[query]
        }
    })

    return res.json(filteredResult)
}

export const sortFlightInfo = async () => {
    return
}

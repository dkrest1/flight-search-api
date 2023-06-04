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
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            error: err.description,
            code: err.code
        });
    }

}

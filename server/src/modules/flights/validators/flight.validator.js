import Joi from "joi";
export async function validateFlightInput(param) {
    const { origin, destination, depature_date, return_date, passenger_number } = param;
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

    return {
        origin, destination, depature_date, return_date, passenger_number
    }
}
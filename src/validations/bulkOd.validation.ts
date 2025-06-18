import Joi from "joi";
import { odSchema } from "./od.validation";


export const odSchemaWithId = odSchema.keys({
    od_id: Joi.string().required().messages({
        "string.base": "OD ID must be a string",
        "string.empty": "OD ID is required",
        "any.required": "OD ID is required",
    }),
});

export const bulkOdSchema = Joi.array()
    .items(odSchemaWithId)
    .min(1)
    .required()
    .messages({
        "array.base": "OD data must be an array",
        "array.min": "At least one OD record is required",
        "any.required": "OD data is required",
    });

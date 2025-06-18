import Joi from "joi";
import { leaseSchema } from "./lease.validation";

export const bulkLeaseSchema = Joi.array()
    .items(leaseSchema)
    .min(1)
    .required()
    .messages({
        "array.base": "Bulk lease data must be an array",
        "array.min": "At least one lease entry is required",
        "any.required": "Lease data is required",
    });

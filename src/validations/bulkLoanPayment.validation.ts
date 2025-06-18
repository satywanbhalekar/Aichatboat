import Joi from "joi";
import { loanPaymentSchema } from "./loanPayment.validation";

// Bulk version of the loan payment schema with ID included
export const loanPaymentWithIdSchema = loanPaymentSchema.keys({
    loan_payment_sched_id: Joi.string().required().messages({
        "string.base": "Loan Payment Schedule ID must be a string",
        "string.empty": "Loan Payment Schedule ID is required",
        "any.required": "Loan Payment Schedule ID is required",
    }),
});


export const bulkLoanPaymentSchema = Joi.array()
    .items(loanPaymentWithIdSchema)
    .min(1)
    .required()
    .messages({
        "array.base": "Bulk loan payment data must be an array",
        "array.min": "At least one loan payment entry is required",
        "any.required": "Loan payment data is required",
    });

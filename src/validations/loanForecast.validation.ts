import Joi from "joi";

export const loanForecastSchema = Joi.object({
    loan_id: Joi.string().required().messages({
        "string.base": "Loan ID must be a string",
        "string.empty": "Loan ID is required",
        "any.required": "Loan ID is required",
    }),

    to_date: Joi.date().iso().required().messages({
        "date.base": "To Date must be a valid date",
        "date.format": "To Date must be in ISO format (YYYY-MM-DD)",
        "any.required": "To Date is required",
    }),

    roi: Joi.number().min(0).max(100).required().messages({
        "number.base": "ROI must be a number",
        "number.min": "ROI must be at least 0",
        "number.max": "ROI must be at most 100",
        "any.required": "ROI is required",
    }),

    emi: Joi.number().min(0).required().messages({
        "number.base": "EMI must be a number",
        "number.min": "EMI must be at least 0",
        "any.required": "EMI is required",
    }),

    opening_loan_balance: Joi.number().required().messages({
        "number.base": "Opening Loan Balance must be a number",
        "any.required": "Opening Loan Balance is required",
    }),

    int_Paid: Joi.number().min(0).required().messages({
        "number.base": "Interest Paid must be a number",
        "number.min": "Interest Paid must be at least 0",
        "any.required": "Interest Paid is required",
    }),

    principal_paid: Joi.number().min(0).required().messages({
        "number.base": "Principal Paid must be a number",
        "number.min": "Principal Paid must be at least 0",
        "any.required": "Principal Paid is required",
    }),

    closing_loan_balance: Joi.number().required().messages({
        "number.base": "Closing Loan Balance must be a number",
        "any.required": "Closing Loan Balance is required",
    }),

    created_at: Joi.date().optional().messages({
        "date.base": "Created At must be a valid date",
    }),

    updated_at: Joi.date().optional().messages({
        "date.base": "Updated At must be a valid date",
    }),
});

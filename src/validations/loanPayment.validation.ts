import Joi from "joi";

export const loanPaymentSchema = Joi.object({

    loan_id: Joi.string().required().messages({
        "string.base": "Loan ID must be a string",
        "string.empty": "Loan ID is required",
        "any.required": "Loan ID is required",
    }),

    payment_date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            "string.pattern.base": "Payment Date must be in YYYY-MM-DD format",
            "string.empty": "Payment Date is required",
            "any.required": "Payment Date is required",
        }),

    emi: Joi.number().min(0).required().messages({
        "number.base": "EMI must be a number",
        "number.min": "EMI must be at least 0",
        "any.required": "EMI is required",
    }),

    interest: Joi.number().min(0).required().messages({
        "number.base": "Interest must be a number",
        "number.min": "Interest must be at least 0",
        "any.required": "Interest is required",
    }),

    principal: Joi.number().min(0).required().messages({
        "number.base": "Principal must be a number",
        "number.min": "Principal must be at least 0",
        "any.required": "Principal is required",
    }),

    opening_loan_balance: Joi.number().required().messages({
        "number.base": "Opening Loan Balance must be a number",
        "any.required": "Opening Loan Balance is required",
    }),

    closing_loan_balance: Joi.number().required().messages({
        "number.base": "Closing Loan Balance must be a number",
        "any.required": "Closing Loan Balance is required",
    }),

    roi: Joi.number().min(0).max(100).optional().messages({
        "number.base": "ROI must be a number",
        "number.min": "ROI must be at least 0",
        "number.max": "ROI must be at max 100"
    }),

    created_at: Joi.date().optional().messages({
        "date.base": "Created At must be a valid date",
    }),

    updated_at: Joi.date().optional().messages({
        "date.base": "Updated At must be a valid date",
    }),

    created_by: Joi.string().optional().messages({
        "string.base": "Created By must be a string",
    }),

    updated_by: Joi.string().optional().messages({
        "string.base": "Updated By must be a string",
    }),
});

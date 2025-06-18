import Joi from "joi";

export const odSchema = Joi.object({
    loan_id: Joi.string().required().messages({
        "string.base": "Loan ID must be a string",
        "string.empty": "Loan ID is required",
        "any.required": "Loan ID is required",
    }),

    payment_date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD
        .required()
        .messages({
            "string.pattern.base": "Payment Date must be in YYYY-MM-DD format",
            "string.empty": "Payment Date is required",
            "any.required": "Payment Date is required",
        }),

    opening_balance: Joi.number().required().messages({
        "number.base": "Opening Balance must be a number",
        "any.required": "Opening Balance is required",
    }),

    limit_reduced: Joi.number().required().messages({
        "number.base": "Limit Reduced must be a number",
        "any.required": "Limit Reduced is required",
    }),

    closing_balance: Joi.number().required().messages({
        "number.base": "Closing Balance must be a number",
        "any.required": "Closing Balance is required",
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

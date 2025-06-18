import Joi from 'joi';

export const loanSchema = Joi.object({
   
    lender_name: Joi.string().required().messages({
        'string.empty': 'Lender Name is required',
        'any.required': 'Lender Name is required',
    }),

    sanctioned_amt: Joi.number().min(0).required().messages({
        'number.base': 'Sanctioned Amount must be a number',
        'number.min': 'Sanctioned Amount must be at least 0',
        'any.required': 'Sanctioned Amount is required',
    }),

    roi: Joi.number().min(0).max(100).required().messages({
        'number.base': 'Rate of Interest (ROI) must be a number',
        'number.min': 'Rate of Interest (ROI) must be at least 0',
        'number.max': 'Rate of Interest (ROI) must be at max 100',
        'any.required': 'ROI is required',
    }),

    loan_type: Joi.string().valid('LRD', 'OD loan').required().messages({
        'any.only': 'Loan Type must be one of: LRD, OD loan',
        'any.required': 'Loan Type is required',
    }),

    loan_status: Joi.string().valid('Active', 'Inactive').required().messages({
        'any.only': 'Loan Status must be one of: Active, Inactive',
        'any.required': 'Loan Status is required',
    }),

    loan_start_date: Joi.string().isoDate().required().messages({
        'string.isoDate': 'Loan Start Date must be in ISO format (YYYY-MM-DD)',
        'any.required': 'Loan Start Date is required',
    }),

    processing_fees: Joi.number().min(0).required().messages({
        'number.base': 'Processing Fees must be a number',
        'number.min': 'Processing Fees must be at least 0',
        'any.required': 'Processing Fees is required',
    }),

    tenures_in_months: Joi.number().integer().min(1).required().messages({
        'number.base': 'Tenure must be a number',
        'number.min': 'Tenure must be at least 1 month',
        'any.required': 'Tenure is required',
    }),

    pre_payment_charges: Joi.number().min(0).optional().allow(null).messages({
        'number.base': 'Pre-payment Charges must be a number',
        'number.min': 'Pre-payment Charges must be at least 0',
    }),

    created_at: Joi.date().optional().messages({
        'date.base': 'Created At must be a valid date',
    }),

    updated_at: Joi.date().optional().messages({
        'date.base': 'Updated At must be a valid date',
    }),

    created_by: Joi.string().optional().messages({
        'string.base': 'Created By must be a string',
    }),

    updated_by: Joi.string().optional().messages({
        'string.base': 'Updated By must be a string',
    }),

    property_ids: Joi.array().items(Joi.string()).optional().messages({
        'array.base': 'Property IDs must be an array of strings',
    }),
});

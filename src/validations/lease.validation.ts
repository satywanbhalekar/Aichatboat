import Joi from "joi";

export const leaseSchema = Joi.object({
  monthly_license_start: Joi.string()
    .isoDate()
    .required()
    .messages({
      "string.isoDate":
        "Monthly License Start must be in ISO format (YYYY-MM-DD)",
      "any.required": "Monthly License Start is required",
    }),

  monthly_license_end: Joi.string().isoDate().required().messages({
    "string.isoDate": "Monthly License End must be in ISO format (YYYY-MM-DD)",
    "any.required": "Monthly License End is required",
  }),

  tenant_id: Joi.string().required().messages({
    "string.empty": "Tenant ID is required",
    "any.required": "Tenant ID is required",
  }),

  property_id: Joi.string().required().messages({
    "string.empty": "Property ID is required",
    "any.required": "Property ID is required",
  }),

  lease_charge_monthly: Joi.number().min(0).required().messages({
    "number.base": "Lease Charge Monthly must be a number",
    "number.min": "Lease Charge Monthly must be at least 0",
    "any.required": "Lease Charge Monthly is required",
  }),

  lockin_period_start: Joi.string().isoDate().required().messages({
    "string.isoDate": "Lock-in Period Start must be in ISO format (YYYY-MM-DD)",
    "any.required": "Lock-in Period Start is required",
  }),

  lockin_period_end: Joi.string().isoDate().required().messages({
    "string.isoDate": "Lock-in Period End must be in ISO format (YYYY-MM-DD)",
    "any.required": "Lock-in Period End is required",
  }),

  // status: Joi.string()
  //   .valid("Active", "Completed", "Left Early")
  //   .optional()
  //   .messages({
  //     "any.only": "Status must be one of: Active, Completed, Left Early",
  //     "string.empty": "Status is required",
  //     "any.required": "Status is required",
  //   }),
    status: Joi.string()
    .valid("Active", "Completed", "Cancelled", "Expected")
    .optional()
    .messages({
      "any.only": "Status must be one of: Active, Completed, Cancelled,Expected",
      "string.empty": "Status is required",
      "any.required": "Status is required",
    }),
  cam_charges: Joi.number().min(0).allow(null, "").optional().messages({
    "number.base": "CAM Charges must be a number",
    "number.min": "CAM Charges must be at least 0",
    "any.required": "CAM Charges are required",
  }),

  security_deposit_in: Joi.number().allow(null, "").min(0).optional().messages({
    "number.base": "Security Deposit In must be a number",
    "number.min": "Security Deposit In must be at least 0",
    "any.required": "Security Deposit In is required",
  }),

  security_deposit_out: Joi.number()
    .allow(null, "")
    .min(0)
    .optional()
    .messages({
      "number.base": "Security Deposit Out must be a number",
      "number.min": "Security Deposit Out must be at least 0",
      "any.required": "Security Deposit Out is required",
    }),

  free_licence_period_from: Joi.string()
    .allow(null, "")
    .isoDate()
    .optional()
    .messages({
      "string.isoDate":
        "Free License Period From must be in ISO format (YYYY-MM-DD)",
    }),

  free_licence_period_to: Joi.string()
    .allow(null, "")
    .isoDate()
    .optional()
    .messages({
      "string.isoDate":
        "Free License Period To must be in ISO format (YYYY-MM-DD)",
    }),

  created_at: Joi.date().optional().messages({
    "date.base": "Created At must be a valid date",
  }),

  updated_at: Joi.date().optional().messages({
    "date.base": "Updated At must be a valid date",
  }),
});
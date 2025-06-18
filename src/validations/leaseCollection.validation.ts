import Joi from "joi";

export const leaseCollectionSchema = Joi.object({
  lease_id: Joi.string().required().messages({
    "string.empty": "Lease ID is required",
    "any.required": "Lease ID is required"
  }),

  tenant_id: Joi.string().required().messages({
    "string.empty": "Tenant ID is required",
    "any.required": "Tenant ID is required"
  }),

  collection_month: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // ✅ Enforce YYYY-MM-DD format
    .required()
    .messages({
      "string.pattern.base": "Collection month must be in YYYY-MM-DD format",
      "string.empty": "Collection month is required",
      "any.required": "Collection month is required"
    }),


  lease_charge: Joi.number().min(0).required().messages({
    "number.base": "Lease charge must be a number",
    "number.min": "Lease charge must be at least 0",
    "any.required": "Lease charge is required"
  }),

  status: Joi.string().valid("Received", "Not Received").required().messages({
    "any.only": "Status must be one of: Received, Not Received",
    "string.empty": "Status is required",
    "any.required": "Status is required"
  }),

  comment: Joi.string().optional().messages({
    "string.base": "Comment must be a string"
  })
});

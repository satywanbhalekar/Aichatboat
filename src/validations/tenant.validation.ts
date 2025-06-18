import Joi from "joi";

export const tenantSchema = Joi.object({
    property_id: Joi.string()
    .optional()
    .allow(null, '')         // allow null and empty string
    .empty('')               // treat empty string as undefined
    .default(null)           // default to null if missing/empty
    .messages({
      "string.base": "Property ID must be a string",
    }),
  
  
property_name: Joi.string()
.min(3)
.max(100)
.optional()
.messages({
"string.min": "Property name must be at least 3 characters",
"string.max": "Property name must be at most 100 characters",
"string.empty": "Property name is required",
"any.required": "Property name is required"
}),

tenant_name: Joi.string()
.min(3)
.max(100)
.required()
.messages({
"string.min": "Tenant name must be at least 3 characters",
"string.max": "Tenant name must be at most 100 characters",
"string.empty": "Tenant name is required",
"any.required": "Tenant name is required"
}),

liscence_period_from: Joi.string()
.isoDate()
.optional()
.messages({
"string.isoDate": "License period start must be in ISO format (YYYY-MM-DD)",
"any.required": "License period start date is required"
}),

liscence_period_to: Joi.string()
.isoDate()
.optional()
.messages({
"string.isoDate": "License period end must be in ISO format (YYYY-MM-DD)",
"any.required": "License period end date is required"
}),

created_at: Joi.date()
.optional()
.messages({
"date.base": "Created At must be a valid date"
}),

updated_at: Joi.date()
.optional()
.messages({
"date.base": "Updated At must be a valid date"
})
});


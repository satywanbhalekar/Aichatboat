import Joi from "joi";

export const entitySchema = Joi.object({

  entity_name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.min": "Entity name must be at least 3 characters",
      "string.max": "Entity name must be at most 100 characters",
      "string.empty": "Entity name is required",
      "any.required": "Entity name is required"
    }),

  created_at: Joi.date().optional().messages({
    "date.base": "Created At must be a valid date"
  }),

  updated_at: Joi.date().optional().messages({
    "date.base": "Updated At must be a valid date"
  })
});

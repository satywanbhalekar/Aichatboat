import Joi from "joi";

export const propertySchema = Joi.object({
entity_id: Joi.string()
//.required()
.messages({
"string.empty": "Entity ID is required",
"any.required": "Entity ID is required"
}),

property_name: Joi.string()
.min(3)
.max(100)
.required()
.messages({
"string.min": "Property name must be at least 3 characters",
"string.max": "Property name must be at most 100 characters",
"string.empty": "Property name is required",
"any.required": "Property name is required"
}),

unit_no: Joi.string()
.required()
.messages({
"string.empty": "Unit number is required",
"any.required": "Unit number is required"
}),

property_location: Joi.string()
.required()
.messages({
"string.empty": "Property location is required",
"any.required": "Property location is required"
}),

city: Joi.string()
.required()
.messages({
"string.empty": "City is required",
"any.required": "City is required"
}),

state: Joi.string()
.required()
.messages({
"string.empty": "State is required",
"any.required": "State is required"
}),

country: Joi.string()
.required()
.messages({
"string.empty": "Country is required",
"any.required": "Country is required"
}),

zip_code: Joi.string()
.pattern(/^\d{5,10}$/) // ✅ Ensures zip_code is 5 to 10 digits
.required()
.messages({
"string.pattern.base": "Zip code must be between 5 to 10 digits",
"string.empty": "Zip code is required",
"any.required": "Zip code is required"
}),

chargeable_area: Joi.number()
.min(0)
.required()
.messages({
"number.base": "Chargeable area must be a number",
"number.min": "Chargeable area must be at least 0",
"any.required": "Chargeable area is required"
}),

carpet_area: Joi.number()
.min(0)
.required()
.messages({
"number.base": "Carpet area must be a number",
"number.min": "Carpet area must be at least 0",
"any.required": "Carpet area is required"
}),

car_parks_count: Joi.number()
.integer()
.min(0)
.required()
.messages({
"number.base": "Car parks count must be a number",
"number.min": "Car parks count must be at least 0",
"any.required": "Car parks count is required"
}),

tw_2whl_parks_count: Joi.number()
.integer()
.min(0)
.required()
.messages({
"number.base": "Two-wheeler parking count must be a number",
"number.min": "Two-wheeler parking count must be at least 0",
"any.required": "Two-wheeler parking count is required"
}),

agreement_date: Joi.string()
.isoDate()
.required()
.messages({
"string.isoDate": "Agreement date must be in ISO format (YYYY-MM-DD)",
"any.required": "Agreement date is required"
}),

agreement_value: Joi.number()
.min(0)
.required()
.messages({
"number.base": "Agreement value must be a number",
"number.min": "Agreement value must be at least 0",
"any.required": "Agreement value is required"
}),

total_cost: Joi.number()
.min(0)
.required()
.messages({
"number.base": "Total cost must be a number",
"number.min": "Total cost must be at least 0",
"any.required": "Total cost is required"
}),

posession_status: Joi.string()
.messages({
"any.only": "Possession status must be one of: O",
"string.empty": "Possession status is required",
"any.required": "Possession status is required"
}),

current_market_value: Joi.number()
.min(0)
.required()
.messages({
"number.base": "Current market value must be a number",
"number.min": "Current market value must be at least 0",
"any.required": "Current market value is required"
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


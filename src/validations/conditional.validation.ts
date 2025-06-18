import { RequestHandler } from "express";

export const conditionalValidateRequest = (
    validate: RequestHandler,
    onlyForAction: string
): RequestHandler => {
    return (req, res, next) => {
        if (req.params.action === onlyForAction) {
            return validate(req, res, next);
        }
        next();
    };
};

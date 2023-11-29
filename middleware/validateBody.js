import { ERROR_CODES } from "../common/constants/statusCode.constants.js";
import { MessageHandler } from "../common/utils/handlers.js";

const { BAD_REQUEST } = ERROR_CODES;
export const validateBody = (schema) => {
    return (req, res, next) => {
        const body = req.file? {...req.body,file:req.file} : req.body
        const { error } = schema.validate(body);

        if (error) {
            throw new MessageHandler(BAD_REQUEST, error.details[0].message);
        }
        next();
    };
};

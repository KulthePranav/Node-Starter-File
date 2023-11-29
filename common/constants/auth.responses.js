import { ERROR_CODES } from "./statusCode.constants.js";
import { ERROR_MESSAGE } from "./statusMessages.constants.js";
import { MessageHandler } from "../utils/handlers.js";

const { UNAUTHORIZED, FORBIDDEN, INTERNAL_SERVER } = ERROR_CODES;
const { UNAUTHORIZED_MESSAGE, FORBIDDEN_MESSAGE, SERVER_ERROR } = ERROR_MESSAGE;

export const AUTH_RESPONSES = {
    UNAUTHORIZED_USER: new MessageHandler(UNAUTHORIZED, UNAUTHORIZED_MESSAGE),
    FORBIDDEN_USER: new MessageHandler(FORBIDDEN, FORBIDDEN_MESSAGE),
    INTERNAL_SERVER_ERROR: new MessageHandler(INTERNAL_SERVER, SERVER_ERROR),
};

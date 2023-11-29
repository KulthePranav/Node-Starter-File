import { ERROR_CODES } from "./statusCode.constants.js";
import { ERROR_MESSAGE } from "./statusMessages.constants.js";
import { MessageHandler } from "../utils/handlers.js";

const { INTERNAL_SERVER } = ERROR_CODES;
const { FAILED_TO_CONNECT } = ERROR_MESSAGE;

export const DB_RESPONSES = {
    CONNECTION_FAILED: new MessageHandler(INTERNAL_SERVER, FAILED_TO_CONNECT),
};

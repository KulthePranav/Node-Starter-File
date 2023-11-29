import { ERROR_CODES } from "./statusCode.constants.js";
import { ERROR_MESSAGE } from "./statusMessages.constants.js";
import { MessageHandler } from "../utils/handlers.js";

const { BAD_REQUEST } = ERROR_CODES;
const { FILE_NOT_FOUND } = ERROR_MESSAGE;


export const ADLS_RESPONSES = {
    FILE_MISSING : new MessageHandler(BAD_REQUEST,FILE_NOT_FOUND)
};
import { config } from "dotenv";
config();
import { DefaultAzureCredential } from "@azure/identity";
import { DB_CONSTANTS } from "../common/constants/db.constants.js";
const {
  env: {
    ServerName,
    DatabaseName,
    AZURE_GET_TOKEN_URL,
    AZURE_AUTHENTICATION_TYPE,
  },
} = process;
const { REQUEST_TIMEOUT, CONNECTION_TIMEOUT, MAX, MIN, IDLE_TIMEOUT_MILLIS } =
  DB_CONSTANTS;

const credential = new DefaultAzureCredential();
const { token } = await credential.getToken(AZURE_GET_TOKEN_URL);

export const dbConfig = {
  server: ServerName,
  database: DatabaseName,
  authentication: {
    type: AZURE_AUTHENTICATION_TYPE,
    options: {
      token,
    },
  },
  requestTimeout: REQUEST_TIMEOUT,
  connectionTimeout: CONNECTION_TIMEOUT,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: MAX,
    min: MIN,
    idleTimeoutMillis: IDLE_TIMEOUT_MILLIS,
  },
};

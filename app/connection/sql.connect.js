import sql from "mssql";
import { dbConfig } from "../../config/db.config.js";
import { DB_RESPONSES } from "../../common/constants/db.responses.js";

const { CONNECTION_FAILED } = DB_RESPONSES;

export const pool = new sql.ConnectionPool(dbConfig);
export const connectToSql = async () => {
    try {
        await pool.connect();
        console.log("CONNECTED TO DATABASE!");
        return pool;
    } catch (error) {
        console.log(error);
        throw CONNECTION_FAILED;
    }
};
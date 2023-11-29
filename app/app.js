import express from "express";
import { connectToSql } from "./connection/sql.connect.js";
import { registerRoutes } from "./routesRegister/routes.register.js";

const { PORT } = process.env;

export const startServer = async () => {
    try {
        const app = express();
        await connectToSql();
        registerRoutes(app);
        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        console.error("COULD NOT START SERVER");
        process.exit(1);
    }
};

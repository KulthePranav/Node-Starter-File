import helmet from "helmet";
import cors from "cors";
import { json, urlencoded } from "express";
import { routes } from "./routes.data.js";
import { ResponseHandler } from "../../common/utils/handlers.js";
import { ROUTE_CONSTANTS } from "../../common/constants/routeConstants.js";

const { SERVER_HEALTH_CHECK } = ROUTE_CONSTANTS;
const {
  env: { UI_ROUTE, AppServiceUiEndpoint },
} = process;

export const registerRoutes = (app) => {
  const corsOptions = {
    origin: [UI_ROUTE, AppServiceUiEndpoint],
  };
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(json());
  app.use(urlencoded({ extended: false, limit: "2mb" }));
  for (let route of routes) {
    app.use(route.path, route.router);
  }
  app.get(SERVER_HEALTH_CHECK, (req, res, next) => {
    res
      .status(200)
      .send(new ResponseHandler({ message: "Server is Running!!" }));
  });
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
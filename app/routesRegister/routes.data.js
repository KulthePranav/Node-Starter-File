import { RouteHandler } from "../../common/utils/handlers.js";
import { ROUTE_CONSTANTS } from "../../common/constants/routeConstants.js";
import { sidemenuRouter } from "../sidemenu/sidemenu.routes.js";
import { userRouter } from "../users/users.routes.js";

const { USERS, SIDEMENU} =
  ROUTE_CONSTANTS;

export const routes = [
  new RouteHandler(USERS, userRouter),
  new RouteHandler(SIDEMENU, sidemenuRouter),
];

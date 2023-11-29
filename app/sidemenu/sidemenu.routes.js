import { Router } from "express";
import { authorize, permit } from "../../middleware/authorize.js";
import { ROUTE_CONSTANTS } from "../../common/constants/routeConstants.js";
import { ResponseHandler } from "../../common/utils/handlers.js";
import { SUCCESS_CODES } from "../../common/constants/statusCode.constants.js";
import sidemenuService from "../sidemenu/sidemenu.service.js";
import { ROLES } from "../../common/constants/roles.constants.js";

const { OK } = SUCCESS_CODES;
const { BASE_PATH, GET_ALL_ROUTES } = ROUTE_CONSTANTS;
const {ADMIN,USER} = ROLES;

export const sidemenuRouter = Router();

sidemenuRouter.get(BASE_PATH, authorize,permit([ADMIN,USER]), async (req, res, next) => {
    try {
        const {
            locals: {
                roles: [role],
            },
        } = res;
        const response = await sidemenuService.getDefaultRoute(role);
        res.status(OK).send(new ResponseHandler(response));
    } catch (error) {
        next(error);
    }
});

sidemenuRouter.get(GET_ALL_ROUTES, authorize,permit([ADMIN,USER]), async (req, res, next) => {
    try {
        const {
            locals: {
                roles: [role],
            },
        } = res;
        const response = await sidemenuService.getAllRoutes(role);
        res.status(OK).send(new ResponseHandler(response));
    } catch (error) {
        next(error);
    }
});

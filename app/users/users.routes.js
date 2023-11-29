import { Router } from "express";
import { authorize } from "../../middleware/authorize.js";
import { ROUTE_CONSTANTS } from "../../common/constants/routeConstants.js";
import { ResponseHandler } from "../../common/utils/handlers.js";

const { BASE_PATH } = ROUTE_CONSTANTS;

export const userRouter = Router();

userRouter.get(BASE_PATH, authorize, async (req, res, next) => {
  try {
    const {
      name,
      preferred_username: email,
      roles: [role],
    } = res.locals;
    res.send(new ResponseHandler({ userName: name, email, role : role.split("-")[1] }));
  } catch (error) {
    next(error);
  }
});

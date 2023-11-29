import sidemenuRepo from "../sidemenu/sidemenu.db.js";
import { AUTH_RESPONSES } from "../../common/constants/auth.responses.js";

const { INTERNAL_SERVER_ERROR } = AUTH_RESPONSES;

const getDefaultRoute = async (role) => {
    try {
        const result = await sidemenuRepo.getDefaultRoute(role);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR;
    }
};

const getAllRoutes = async (role) => {
    try {
        const result = await sidemenuRepo.getAllRoutes(role);
        return result;
    } catch (error) {
        throw INTERNAL_SERVER_ERROR;
    }
};
export default {
    getDefaultRoute,
    getAllRoutes,
};

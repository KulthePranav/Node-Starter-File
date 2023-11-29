import { AZURE_AD_CONSTANTS } from "../common/constants/azureAd.constants.js";
import { AUTH_RESPONSES } from "../common/constants/auth.responses.js";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";

const { JWKS_URI } = AZURE_AD_CONSTANTS;
const { UNAUTHORIZED_USER, FORBIDDEN_USER } = AUTH_RESPONSES;

export const authorize = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        if (token) {
            const {
                header: { kid, alg: jwtAlgorithm }
            } = jwt.decode(token, { complete: true });
            let client = jwksClient({
                jwksUri: JWKS_URI,
            });

            const key = await client.getSigningKey(kid);
            if (key) {
                const signingKey = key.publicKey || key.rsaPublicKey;
                const decoded = jwt.verify(token, signingKey, {
                    algorithms: [jwtAlgorithm],
                });
                res.locals = decoded;
                next();
            } else {
                throw FORBIDDEN_USER;
            }
        } else {
            throw UNAUTHORIZED_USER;
        }
    } catch (error) {
        next(FORBIDDEN_USER);
    }
};

export const permit = (permittedRoles) => {
    return (req, res, next) => {
        if(!res.locals.roles)  return next(FORBIDDEN_USER);
        const {
            locals: {
                roles: [role],
            },
        } = res;
        if (permittedRoles.includes(role)) {
            return next();
        }
        next(FORBIDDEN_USER);
    };
};

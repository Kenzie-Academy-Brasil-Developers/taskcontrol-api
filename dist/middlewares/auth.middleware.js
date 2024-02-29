"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor() {
        this.isAuthenticated = (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization)
                throw new errors_1.AppError("Token is required", 401);
            const [_, token] = authorization.split(" ");
            if (!token)
                throw new errors_1.AppError("Token is required", 401);
            const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            res.locals = Object.assign(Object.assign({}, res.locals), { sub });
            return next();
        };
    }
}
exports.auth = new AuthMiddleware();

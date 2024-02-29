"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../database/prisma");
const errors_1 = require("../errors");
class SessionService {
    constructor() {
        this.login = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield prisma_1.prisma.user.findFirst({ where: { email } });
            if (!foundUser) {
                throw new errors_1.AppError("User not exists!", 404);
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, foundUser.password);
            if (!passwordMatch) {
                throw new errors_1.AppError("Email and password doesn't match", 401);
            }
            const secret = process.env.JWT_SECRET;
            const expiresIn = process.env.EXPIRES_IN;
            const accessToken = (0, jsonwebtoken_1.sign)({}, secret, {
                subject: foundUser.id.toString(),
                expiresIn: expiresIn
            });
            const authenticated = {
                accessToken,
                user: {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email
                }
            };
            return authenticated;
        });
    }
}
exports.SessionService = SessionService;

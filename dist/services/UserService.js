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
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
class UserService {
    constructor() {
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            payload.password = yield (0, bcryptjs_1.hash)(payload.password, 10);
            const newUser = yield prisma_1.prisma.user.create({
                data: payload
            });
            return schemas_1.userReturnSchema.parse(newUser);
        });
        this.retrieveUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield prisma_1.prisma.user.findFirst({ where: { id: userId } });
            return schemas_1.userReturnSchema.parse(foundUser);
        });
        // public read = async(userId: number): Promise<Array<TUserReturn>> => {
        //     const getUser = await prisma.user.findFirst({where: {id: userId}});
        //     return getUser;
        // }
    }
}
exports.UserService = UserService;

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
exports.ensure = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../errors");
class EnsureMiddleware {
    constructor() {
        this.validBody = (schema) => (req, _, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
        this.categoryIdExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.categoryId) {
                    const category = req.body.categoryId;
                    const searchCategory = yield prisma_1.prisma.category.findFirst({
                        where: {
                            id: category
                        }
                    });
                    if (!searchCategory) {
                        return res.status(404).json({ message: 'Category not found' });
                    }
                }
                next();
            }
            catch (error) {
                return res.status(500).json(error);
            }
            ;
        });
        this.taskIdExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Number(req.params.id);
                const searchId = yield prisma_1.prisma.task.findFirst({ where: { id: params } });
                if (!searchId) {
                    return res.status(404).json({ message: 'Task not found' });
                }
                next();
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
        this.category = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Number(req.params.id);
                const searchId = yield prisma_1.prisma.category.findFirst({ where: { id: params } });
                if (!searchId) {
                    return res.status(404).json({ message: 'Task not found' });
                }
                next();
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
        this.emailIsUnique = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                return next();
            }
            const foundUser = yield prisma_1.prisma.user.findFirst({ where: { email } });
            if (foundUser) {
                throw new errors_1.AppError("This email is already registered!", 409);
            }
            return next();
        });
    }
}
exports.ensure = new EnsureMiddleware();

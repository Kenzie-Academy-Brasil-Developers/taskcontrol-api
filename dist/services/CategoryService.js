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
exports.CategoryService = void 0;
const prisma_1 = require("../database/prisma");
const errors_1 = require("../errors");
class CategoryService {
    constructor() {
        this.create = (payload, userId) => __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield prisma_1.prisma.category.create({
                data: Object.assign(Object.assign({}, payload), { userId })
            });
            return newCategory;
        });
        this.deleteOne = (categoryId, userId) => __awaiter(this, void 0, void 0, function* () {
            const currentCategory = yield prisma_1.prisma.category.findFirst({ where: { id: categoryId } });
            if (!currentCategory || currentCategory.userId !== userId) {
                throw new errors_1.AppError("Forbidden", 403);
            }
            const deleteCategory = yield prisma_1.prisma.category.delete({ where: { id: categoryId, userId: userId } });
            return deleteCategory;
        });
    }
}
exports.CategoryService = CategoryService;

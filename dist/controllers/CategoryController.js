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
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
class CategoryController {
    constructor() {
        this.categoryService = new CategoryService_1.CategoryService();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(res.locals.sub);
            console.log(id);
            const newCategory = yield this.categoryService.create(req.body, id);
            return res.status(201).json(newCategory);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(res.locals.sub);
            const categoryId = Number(req.params.id);
            const deleteCategory = yield this.categoryService.deleteOne(categoryId, userId);
            return res.status(204).json(deleteCategory);
        });
    }
}
exports.CategoryController = CategoryController;

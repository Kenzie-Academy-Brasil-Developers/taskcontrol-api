"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    userId: zod_1.z.number().positive()
});
exports.categorySchema = categorySchema;
const createCategorySchema = categorySchema.omit({ id: true, userId: true });
exports.createCategorySchema = createCategorySchema;

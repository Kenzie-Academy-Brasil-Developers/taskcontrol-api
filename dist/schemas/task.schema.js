"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskUpdateSchema = exports.taskCreateSchema = exports.taskWithCategorySchema = exports.taskSchema = exports.taskReturnSchema = void 0;
const zod_1 = require("zod");
const category_schema_1 = require("./category.schema");
const taskSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().optional().nullish(),
    userId: zod_1.z.number().positive()
});
exports.taskSchema = taskSchema;
const taskWithCategorySchema = taskSchema.extend({ category: category_schema_1.categorySchema.nullable().optional() });
exports.taskWithCategorySchema = taskWithCategorySchema;
const taskCreateSchema = taskSchema.omit({ id: true, finished: true, userId: true });
exports.taskCreateSchema = taskCreateSchema;
const taskUpdateSchema = taskSchema.omit({ id: true }).partial();
exports.taskUpdateSchema = taskUpdateSchema;
exports.taskReturnSchema = taskSchema.partial();

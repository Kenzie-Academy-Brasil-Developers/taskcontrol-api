"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userCreateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
exports.userSchema = userSchema;
const userCreateSchema = userSchema.omit({ id: true });
exports.userCreateSchema = userCreateSchema;
const userReturnSchema = userSchema.omit({ password: true });
exports.userReturnSchema = userReturnSchema;

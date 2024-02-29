"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionReturnSchema = exports.sessionCreateSchema = void 0;
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
const user_schema_2 = require("./user.schema");
const sessionCreateSchema = user_schema_1.userSchema.omit({ id: true });
exports.sessionCreateSchema = sessionCreateSchema;
const sessionReturnSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    user: user_schema_2.userReturnSchema
});
exports.sessionReturnSchema = sessionReturnSchema;

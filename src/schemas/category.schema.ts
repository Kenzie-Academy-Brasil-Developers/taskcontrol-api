import {z} from "zod";

import { baseSchema } from "./base.schema";

const categorySchema = baseSchema.extend({
    name: z.string().min(3).max(255)
})

const createCategorySchema = categorySchema.omit({ id: true});

const returnCategorySchema = categorySchema;

export { categorySchema, createCategorySchema, returnCategorySchema}
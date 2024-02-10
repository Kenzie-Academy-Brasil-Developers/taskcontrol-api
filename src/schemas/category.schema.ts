import {z} from "zod";

import { baseSchema } from "./base.schema";

const categorySchema = baseSchema.extend({
    name: z.string()
})

const createCategorySchema = categorySchema.omit({ id: true}).nullish();

export { categorySchema, createCategorySchema}
import {z} from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    category: categorySchema.nullish()
})

const createTaskSchema = taskSchema.pick({title: true, content: true}).extend({categoryId: z.bigint()
}).nullish();

const updateTaskSchema = taskSchema.omit({id: true, category: true}).extend({
    finished: z.boolean().default(true),
    categoryId: z.bigint()
})

const returnTaskSchema = taskSchema.omit({category: true}).extend({
    categoryId: z.bigint()
})

export { taskSchema, createTaskSchema, updateTaskSchema, returnTaskSchema};


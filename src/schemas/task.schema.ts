import {z} from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    title: z.string().min(3).max(255),
    content: z.string().min(3).max(255),
    finished: z.boolean().default(false),
    category: categorySchema,
})

const createTaskSchema = taskSchema.omit({id:true, finished: true, category: true}).extend({
    categoryId: z.number().positive()
});

const updateTaskSchema = taskSchema.omit({id: true, category: true}).extend({
    finished: z.boolean().default(true),
    categoryId: z.number().positive()
})

const returnTaskSchema = taskSchema.omit({category: true}).extend({
    categoryId: z.number().positive()
});

export { taskSchema, createTaskSchema, updateTaskSchema, returnTaskSchema};


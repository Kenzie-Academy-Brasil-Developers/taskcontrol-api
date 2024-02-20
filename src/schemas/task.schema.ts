import {z} from "zod";
import { categorySchema } from "./category.schema";


const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().optional().nullish()
})

const taskWithCategorySchema = taskSchema.extend({category: categorySchema.nullable().optional()});

const taskCreateSchema = taskSchema.omit({id: true, finished: true});

const taskUpdateSchema = taskSchema.omit({id: true}).partial();

export { taskSchema, taskWithCategorySchema, taskCreateSchema, taskUpdateSchema};



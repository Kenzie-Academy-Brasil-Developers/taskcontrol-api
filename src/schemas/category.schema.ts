import {z} from "zod";


const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1)
})

const createCategorySchema = categorySchema.omit({ id: true});


export { categorySchema, createCategorySchema};
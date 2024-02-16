import { z } from "zod";
import { categorySchema, createCategorySchema } from "../schemas";
import { returnCategorySchema } from "../schemas/category.schema";

type createCategory = z.infer<typeof createCategorySchema>

type returnCategory = z.infer<typeof returnCategorySchema>

export { createCategory, returnCategory };
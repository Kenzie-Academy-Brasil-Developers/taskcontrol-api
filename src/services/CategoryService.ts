import { Public } from "@prisma/client/runtime/library";
import { prisma } from "../database/prisma";
import { createCategory, returnCategory } from "../interfaces";
import { returnCategorySchema } from "../schemas/category.schema";

export class CategoryService {
 
    public create = async (payload: createCategory): Promise<returnCategory> => {

        const newCategory = await prisma.category.create({
            data: payload
        })

        return returnCategorySchema.parse(newCategory);
    }

    public deleteOne = async (categoryId: number) => {

        return await prisma.category.delete({where: {id: categoryId}});

    } 

    
}
